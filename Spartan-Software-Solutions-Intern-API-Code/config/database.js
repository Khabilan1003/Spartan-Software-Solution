const mongoose = require("mongoose");

const conn = process.env.DB_URI;

const connection = mongoose.createConnection(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("open", () => {
  console.log("Database successfully connected");
});

connection.on("error", () => {
  console.log("Error connecting to database");
});

module.exports = connection;