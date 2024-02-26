const mongoose = require("mongoose");
const connection = require("../config/database");

const { Schema } = mongoose;

const schema = new Schema(
  {
    CASE_NUMBER: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { strict: false, timestamps: true }
);

const dataSchema = connection.model("DataCollection", schema);
module.exports = dataSchema;
