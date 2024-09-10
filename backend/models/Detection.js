const mongoose = require("mongoose");

const detectionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  language: { type: String, required: true },
  confidence: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Detection", detectionSchema);
