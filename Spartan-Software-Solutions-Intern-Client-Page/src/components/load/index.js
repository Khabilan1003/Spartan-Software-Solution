import React from "react";
import style from "./style.module.css";
import ExcelView from "./excel";
import { GrClose } from "react-icons/gr";
import { useState, useRef } from "react";
import NavBar from "../navbar";

const LoadPage = (props) => {
  const [fileName, setFileName] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetData, setSheetData] = useState({});
  const [columnName, setColumnName] = useState({});
  const XLSX = require("xlsx");

  const [mobile, setMobile] = useState(false);

  var fileRef = useRef();
  var validExtensions = ["xlsx", "xls"];

  function isValidFile(name) {
    console.log(name);
    return validExtensions.includes(name.split(".").pop().toLowerCase());
  }

  function readDataFromExcel(data) {
    const wb = XLSX.read(data);
    setSheetNames(wb.SheetNames);

    let sheet = {};
    let column = {};
    for (var i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];

      const worksheet = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      const upperCaseJsonData = jsonData.map((obj) =>
        Object.keys(obj).reduce((newObj, key) => {
          newObj[key.toUpperCase()] = obj[key];
          return newObj;
        }, {})
      );
      console.log("data : ", upperCaseJsonData);
      const columnNames = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
      sheet[sheetName] = upperCaseJsonData;
      column[sheetName] = [];
      for (let i = 0; i < columnNames.length; i++) {
        column[sheetName].push(String(columnNames[i]).toUpperCase());
      }

      console.log(sheet);
    }
    setSheetData(sheet);
    setColumnName(column);
  }

  async function changeFileName(e) {
    const myFile = e.target.files[0];
    if (!myFile) return;

    if (!isValidFile(myFile.name)) {
      fileRef.current.value = "";
      alert("Invalid File Type");
      return;
    }

    const data = await myFile.arrayBuffer();
    readDataFromExcel(data);

    setFileName(myFile.name);
  }

  function removeFile() {
    setSheetData({});
    setSheetNames([]);
    setFileName(null);
    fileRef.current.value = "";
  }

  return (
    <>
      <NavBar mobile={mobile} setMobile={setMobile} />
      <div className={style.container}>
        <h3 className={style.title}>Read Excel Sheets</h3>
        <div className={style.flex_container}>
          <input
            type="file"
            accept="xlsx, xls"
            multiple={false}
            onChange={(e) => changeFileName(e)}
            ref={fileRef}
          />

          {fileName && <GrClose className={style.icon} onClick={removeFile} />}
        </div>

        <ExcelView
          sheetData={sheetData}
          sheetNames={sheetNames}
          columnName={columnName}
        />
      </div>
    </>
  );
};

export default LoadPage;
