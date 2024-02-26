const mongoose = require("mongoose");
const connection = require("../config/database");
const { Schema } = mongoose;

const schema = Schema(
  {
    COLUMN_NAME: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { strict: false }
);

const columnSchema = connection.model("Columns", schema);

module.exports = columnSchema;
