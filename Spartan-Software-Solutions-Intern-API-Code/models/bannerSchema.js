const mongoose = require("mongoose");
const connection = require("../config/database");
const { Schema } = mongoose;

const bannerSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  url: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  bannerImage: {
    type: mongoose.SchemaTypes.String,
    required: true,
  }, // Store the image data as a Buffer
  priority: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  bannerType: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  startDate: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  endDate: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = connection.model("banners", bannerSchema);
