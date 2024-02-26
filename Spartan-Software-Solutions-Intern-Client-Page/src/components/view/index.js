import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import style from "./style.module.css";
import "./scrollbar.css";
import Select from "react-select";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import NavBar from "../navbar";
import { useSelector } from "react-redux";
import ErrorModal from "../UI/errormodal";
import Carousel from "../carousel";

const ViewPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [records, setRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [columns, setColumns] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sortFilter, setSortFilter] = useState({
    isSorting: 0,
  });
  const [searchField, setSearchField] = useState("");
  const searchFieldRef = useRef("");
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  const [mobile, setMobile] = useState(false);

  const errorHandler = () => {
    setError(null);
  };
  // Loading Records
  const loadRecords = async () => {
    try {
      if (user.isLoggedIn) {
        setIsLoading(true);
        const result = await axios.get(
          "http://localhost:5000/data/getRecords/" + String(pageNumber),
          {
            params: {
              isSorting: sortFilter.isSorting,
              columnName: sortFilter.columnName,
              direction: sortFilter.direction,
              search: searchField,
            },
            withCredentials: true,
          }
        );
        console.log(result.data);
        if (result.data.isPremiumData) {
          setError({
            title: "Not a Premium User",
            message:
              "Normal Users are allowed to access only 80% of our data. If you want to see all data become our Premium User",
            isUser: true,
          });
          setPageNumber(1);
          return;
        }
        setRecords(result.data.records);
        setColumns(result.data.columns);
        if (filteredColumns.length === 0)
          setFilteredColumns(result.data.columns);
        const pages = await axios.get(
          "http://localhost:5000/data/getTotalRecords",
          {
            params: {
              search: searchField,
            },
            withCredentials: true,
          }
        );

        setTotalPages(pages.data.totalPages);
        setTotalRecords(pages.data.totalRecords);

        let opt = [];
        result.data.columns.map((column) => {
          opt.push({ value: column, label: column });
        });
        setOptions(opt);
        setIsLoading(false);
        searchFieldRef.current = searchField;
      } else if (
        pageNumber == 1 &&
        sortFilter.isSorting == 0 &&
        searchField.length == 0
      ) {
        try {
          setIsLoading(true);
          const result = await axios.get(
            "http://localhost:5000/data/getRecords",
            {
              withCredentials: true,
            }
          );
          setRecords(result.data.records);
          setColumns(result.data.columns);
          if (filteredColumns.length === 0)
            setFilteredColumns(result.data.columns);
          const pages = await axios.get(
            "http://localhost:5000/data/getTotalRecords",
            {
              params: {
                search: searchField,
              },
              withCredentials: true,
            }
          );
          setTotalPages(pages.data.totalPages);
          setTotalRecords(pages.data.totalRecords);

          let opt = [];
          result.data.columns.map((column) => {
            opt.push({ value: column, label: column });
          });
          setOptions(opt);
          setIsLoading(false);
        } catch (error) {}
      } else {
        if (pageNumber != 1) {
          setError({
            title: "Pagination Not Allowed",
            message:
              "If you want to go to some other page, you have to login in to our website",
            isUser: false,
          });
          setPageNumber(1);
        } else if (sortFilter.isSorting != 0) {
          setError({
            title: "Sorting Not Allowed",
            message:
              "If you want to Sort the data you have to login in to our website",
            isUser: false,
          });
          setSortFilter({
            isSorting: 0,
          });
        } else if (searchField.length != 0) {
          setError({
            title: "Searching Not Allowed",
            message:
              "If you want to Search the data you have to login in to our website",
            isUser: false,
          });
          setSearchField("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadRecords();
  }, [pageNumber, sortFilter]);
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const firstPage = () => {
    setPageNumber(1);
  };
  const lastPage = () => {
    setPageNumber(totalPages);
  };

  const handleChange = (selectedOption) => {
    let cols = [];
    for (let i = 0; i < selectedOption.length; i++) {
      cols.push(selectedOption[i].value);
    }
    if (cols.length === 0) setFilteredColumns(columns);
    else setFilteredColumns(cols);
    setSelectedColumns(selectedOption);
  };

  const sortFilterChange = (column) => {
    if (sortFilter.isSorting === 1) {
      if (sortFilter.columnName === column) {
        if (sortFilter.direction === 0) {
          setSortFilter({
            isSorting: 1,
            columnName: column,
            direction: 1,
          });
        } else {
          setSortFilter({
            isSorting: 0,
          });
        }
      } else {
        setSortFilter({
          isSorting: 1,
          columnName: column,
          direction: 0,
        });
      }
    } else {
      setSortFilter({
        isSorting: 1,
        columnName: column,
        direction: 0,
      });
    }
  };

  return (
    <>
      {error ? (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
          isUser={error.isUser}
        />
      ) : (
        ""
      )}
      {isLoading ? (
        <div className={style.loader_aligner}>
          <div className={style.loader}></div>
        </div>
      ) : (
        <>
          <NavBar mobile={mobile} setMobile={setMobile} />
          <Carousel bannerType={"top"} />

          <div
            className={`${style.mainContainer} ${
              mobile == true ? style.displayNone : ""
            }`}
          >
            <div className={style.rowContainer}>
              <div className={style.search_bar}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchField}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (pageNumber === 1) loadRecords();
                      else setPageNumber(1);
                    }
                  }}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (pageNumber === 1) loadRecords();
                    else setPageNumber(1);
                  }}
                >
                  Search
                </button>
              </div>

              <div className={`${style.align_center} ${style.paginationStart}`}>
                <span>
                  Page{" "}
                  <span className={style.pageNumber}>
                    {pageNumber} - {totalPages}
                  </span>
                  {" of "}
                  <span className={style.pageNumber}>{totalRecords}</span>
                  {"  "}
                </span>
                <span>
                  | Go to page :{" "}
                  <input
                    className={style.pageNumberInputField}
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={pageNumber}
                    onChange={(e) => {
                      setPageNumber(e.target.value);
                    }}
                    style={{ width: "50px" }}
                  ></input>
                </span>
                <button
                  className={style.paginationButton}
                  onClick={() => firstPage()}
                  disabled={pageNumber === 1}
                >
                  {"<<"}
                </button>
                <button
                  className={style.paginationButton}
                  onClick={() => prevPage()}
                  disabled={pageNumber === 1}
                >
                  Previous
                </button>
                <button
                  className={style.paginationButton}
                  onClick={() => nextPage()}
                  disabled={pageNumber === totalPages}
                >
                  Next
                </button>
                <button
                  className={style.paginationButton}
                  onClick={() => lastPage()}
                  disabled={pageNumber === totalPages}
                >
                  {">>"}
                </button>
              </div>
            </div>

            <Select
              value={selectedColumns}
              className={style.select}
              options={options}
              isSearchable={true}
              placeholder="Select an option"
              onChange={handleChange}
              isMulti={true}
            />

            <div className={style.table_wrapper}>
              <table className={style.table}>
                <thead>
                  <tr>
                    {filteredColumns.map((column) => (
                      <th
                        key={column}
                        className={style.table_header}
                        onClick={() => sortFilterChange(column)}
                      >
                        <span>{column}</span>
                        {sortFilter.isSorting === 0 ? (
                          <span></span>
                        ) : sortFilter.columnName === column ? (
                          sortFilter.direction === 0 ? (
                            <FaSortUp className={style.icon_up} />
                          ) : (
                            <FaSortDown className={style.icon_down} />
                          )
                        ) : (
                          <span></span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record["CASE_NUMBER"]}>
                      {filteredColumns.map((column, index) => (
                        <td className={style.table_data} key={index}>
                          {record[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${style.align_center} ${style.paginationEnd}`}>
              <div className={style.paginationButtonContainer}>
                <span>
                  Page{" "}
                  <span className={style.pageNumber}>
                    {pageNumber} - {totalPages}
                  </span>
                  {" of "}
                  <span className={style.pageNumber}>{totalRecords}</span>
                  {"  "}
                </span>
                <span>
                  | Go to page :{" "}
                  <input
                    className={style.pageNumberInputField}
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={pageNumber}
                    onChange={(e) => {
                      setPageNumber(e.target.value);
                    }}
                    style={{ width: "50px" }}
                  ></input>
                </span>
              </div>

              <div className={style.paginationButtonContainer}>
                <button
                  className={style.paginationButton}
                  onClick={() => firstPage()}
                  disabled={pageNumber === 1}
                >
                  {"<<"}
                </button>
                <button
                  className={style.paginationButton}
                  onClick={() => prevPage()}
                  disabled={pageNumber === 1}
                >
                  Previous
                </button>
                <button
                  className={style.paginationButton}
                  onClick={() => nextPage()}
                  disabled={pageNumber === totalPages}
                >
                  Next
                </button>
                <button
                  className={style.paginationButton}
                  onClick={() => lastPage()}
                  disabled={pageNumber === totalPages}
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>

          <Carousel bannerType={"bottom"} />
        </>
      )}
    </>
  );
};

export default ViewPage;
