import React, { useMemo } from "react";
import { useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import style from "./style.module.css";
import GlobalFilter from "../GlobalFilter";
import ColumnFilter from "../Column Filter";
import axios from "axios";

const ExcelView = (props) => {
  const [sheet, setSheet] = useState(null);

  return (
    <>
      {props.sheetNames.length !== 0 && (
        <select
          onChange={(e) => {
            setSheet(e.target.value);
            console.log(e);
          }}
        >
          {props.sheetNames.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
      )}
      {props.sheetNames.length !== 0 && !sheet && (
        <Excel
          sheetData={props.sheetData[props.sheetNames[0]]}
          columnName={props.columnName[props.sheetNames[0]]}
        />
      )}
      {props.sheetNames.length !== 0 && sheet && (
        <Excel
          sheetData={props.sheetData[sheet]}
          columnName={props.columnName[sheet]}
        />
      )}
    </>
  );
};

const Excel = (props) => {
  let column = [];
  for (let i = 0; i < props.columnName.length; i++) {
    column.push({
      Header: props.columnName[i],
      accessor: props.columnName[i],
      Filter: ColumnFilter,
    });
  }
  console.log(column);
  const Columns = useMemo(() => column, [props.columnName]);
  const data = useMemo(() => props.sheetData);

  const tableInstance = useTable(
    {
      columns: Columns,
      data: data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  const submitData = async () => {
    try {
      let sheetLength = props.sheetData.length;
      for (let i = 0; i * 20 < sheetLength; i++) {
        console.log(
          props.sheetData.slice(i * 20, Math.min(sheetLength, (i + 1) * 20))
        );
        const res = await axios.post(
          "http://localhost:5000/data/storeRecord",
          {
            columns: props.columnName,
            records: props.sheetData.slice(
              i * 20,
              Math.min(sheetLength, (i + 1) * 20)
            ),
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
      }
      console.log(props.sheetData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className={style.outer_wrapper}>
        <div className={style.table_wrapper}>
          <table className={style.table} {...getTableProps}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className={style.table_header}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <span>{column.render("Header")}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          )
                        ) : (
                          " "
                        )}
                      </span>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className={style.table_data}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.align_center}>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          {"  "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            min={0}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          ></input>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((e) => {
            return (
              <option key={e} value={e}>
                Show {e}
              </option>
            );
          })}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <div>
        <button onClick={() => submitData()}>Submit</button>
      </div>
    </>
  );
};

export default ExcelView;
