const dataSchema = require("../models/dataSchema");
const columnSchema = require("../models/columnSchema");

const getRecords = async (req, res, next) => {
  try {
    let columns = await columnSchema.find(); // Array of Object with COLUMN_NAME
    let cols = [];
    for (let i = 0; i < columns.length; i++) {
      cols.push(columns[i].COLUMN_NAME);
    }
    records = await dataSchema.find().limit(50);
    return res
      .status(200)
      .json({ isError: false, records: records, columns: cols });
  } catch (error) {
    return res.status(404).json({ isError: true, error: error.message });
  }
};

const getRecordsByPageNumber = async (req, res, next) => {
  try {
    let totalRecords = await dataSchema.find();
    totalRecords = totalRecords.length;
    let allowedPages = Math.floor((totalRecords * 0.8) / 50);
    const pageNo = req.params.pageno;
    if (!req.user.isPremium && pageNo > allowedPages) {
      console.log("Not A Premium User");
      return res.json({ isError: false, isPremiumData: true });
    }

    let columns = await columnSchema.find(); // Array of Object with COLUMN_NAME

    // Converting array of objects into array of strings
    let cols = [];
    for (let i = 0; i < columns.length; i++) {
      cols.push(columns[i].COLUMN_NAME);
    }

    const { isSorting, columnName, direction, search } = req.query;
    let records;

    const regex = new RegExp(search, "i");
    let searchArray = [];
    for (let i = 0; i < cols.length; i++) {
      searchArray.push({ [cols[i]]: { $regex: regex } });
    }
    if (isSorting == "0") {
      records = await dataSchema
        .find({
          $or: searchArray,
        })
        .skip(50 * (pageNo - 1))
        .limit(50);
    } else {
      records = await dataSchema
        .find({
          $or: searchArray,
        })
        .sort({ [columnName]: direction === "0" ? 1 : -1 })
        .skip(50 * (pageNo - 1))
        .limit(50);
    }
    return res
      .status(200)
      .json({
        isError: false,
        records: records,
        columns: cols,
        isPremiumData: false,
      });
  } catch (error) {
    return res.status(404).json({ isError: true, error: error.message });
  }
};

const totalRecordsAndPages = async (req, res, next) => {
  try {
    console.log("Get TOTAL Records By Page Number START");
    const { search } = req.query;
    let columns = await columnSchema.find(); // Array of Object with COLUMN_NAME
    // Converting array of objects into array of strings
    let cols = [];
    for (let i = 0; i < columns.length; i++) {
      cols.push(columns[i].COLUMN_NAME);
    }
    const regex = new RegExp(search, "i");
    let searchArray = [];
    for (let i = 0; i < cols.length; i++) {
      searchArray.push({ [cols[i]]: { $regex: regex } });
    }

    let totalRecords = await dataSchema.find({
      $or: searchArray,
    });
    totalRecords = totalRecords.length;
    const totalPages = Math.ceil(totalRecords / 50);
    console.log(totalPages);
    res.status(200).json({ isError: false, totalRecords, totalPages });
  } catch (error) {
    return res.status(404).json({ isError: true, error: error.message });
  }
};

const storeRecords = async (req, res, next) => {
  try {
    // I need two data - Column Names Used , Data in array
    const columns = req.body.columns; // Columns is array of String - So traverse it and add it in Column Document if it is new.
    const records = req.body.records; // Records is

    // Processing Columns - Check whether it is new or not. If new add it in column collection.
    for (let i = 0; i < columns.length; i++) {
      const column = await columnSchema.findOne({
        COLUMN_NAME: String(columns[i]).toUpperCase(),
      });

      // If column is empty it means we need to add it in the column schema
      if (!column) {
        const col = new columnSchema({
          COLUMN_NAME: columns[i],
        });
        col.save();
      }
    }

    // Storing Records in record Collection.
    let noOfRecordsAdded = 0;
    let noOfRecordsUpdated = 0;
    for (let i = 0; i < records.length; i++) {
      // If the object doesn't have CASE NUMBER then move to next record.
      if (records[i].hasOwnProperty("CASE_NUMBER")) {
        // Check whether the record CASE_NUMBER is already in the database. If there then update the existing one
        // If not add a new record.
        let record = await dataSchema.findOne({
          CASE_NUMBER: records[i].CASE_NUMBER,
        });
        if (record) {
          await dataSchema.findOneAndUpdate(
            { CASE_NUMBER: records[i].CASE_NUMBER },
            { $set: records[i] }
          );
          noOfRecordsUpdated += 1;
        } else {
          const record = new dataSchema({
            ...records[i],
          });
          record.save();
          noOfRecordsAdded += 1;
        }
      }
    }
    return res.status(200).json({ noOfRecordsAdded, noOfRecordsUpdated });
  } catch (error) {
    res.status(404).json({ isError: true, error: error.message });
  }
};

const deleteRecords = async (req, res, next) => {
  try {
    let case_number = req.params.CASE_NUMBER;
    await dataSchema.findOneAndRemove({ CASE_NUMBER: case_number });
    return res.status(200).json({
      isError: false,
      message: `Deleted Record with Case number : ${case_number} successfully`,
    });
  } catch (error) {
    return res.status(404).json({ isError: true, error: error.message });
  }
};

module.exports = {
  getRecordsByPageNumber,
  getRecords,
  totalRecordsAndPages,
  storeRecords,
  deleteRecords,
};
