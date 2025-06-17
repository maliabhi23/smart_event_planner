const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  eventType: String,
  weatherAnalysis: Object,
});

module.exports = mongoose.model("Event", eventSchema);
