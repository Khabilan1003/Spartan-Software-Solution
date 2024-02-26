const mongoose = require("mongoose");
const connection = require("../config/database");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    loginType: {
      type: Number,
      required: true,
    },
    isPremium: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = connection.model("UserCredentials", schema);
module.exports = userSchema;
