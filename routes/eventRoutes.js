const express = require("express");
const {
  createEvent,
  getEvents,
  updateEvent,
  getWeather,
  analyzeWeather,
  suitability,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getEvents);
router.put("/events/:id", updateEvent);

router.get("/weather/:location/:date", getWeather);
router.post("/events/:id/weather-check", analyzeWeather);
router.get("/events/:id/suitability", suitability);

module.exports = router;
