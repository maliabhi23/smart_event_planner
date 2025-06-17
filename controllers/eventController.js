const axios = require("axios");
const Event = require("../models/eventModel");
const dotenv = require("dotenv");
require("dotenv").config();

const apiKey = process.env.OPENWEATHER_API_KEY;

console.log("API Key:", process.env.OPENWEATHER_API_KEY);

// Basic weather scoring logic
function calculateScore(weather, eventType) {
  let score = 0;
  const temp = weather.temp;
  const precipitation = weather.precip;
  const wind = weather.wind;
  const condition = weather.description;

  if (eventType === "sports") {
    if (temp >= 15 && temp <= 30) score += 30;
    if (precipitation < 20) score += 25;
    if (wind < 20) score += 20;
    if (condition.includes("clear") || condition.includes("cloud")) score += 25;
  } else if (eventType === "wedding") {
    if (temp >= 18 && temp <= 28) score += 30;
    if (precipitation < 10) score += 30;
    if (wind < 15) score += 25;
    if (condition.includes("clear")) score += 15;
  }

  if (score >= 90) return "Good";
  if (score >= 60) return "Okay";
  return "Poor";
}

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};



exports.getWeather = async (req, res) => {
    const { location, date } = req.params;
  
    try {
        console.log("Fetching weather for:",`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      console.log("Weather data received:", response.data);
        
      const formattedDate = date.split("T")[0]; // keep only "YYYY-MM-DD"
  
      // Find the forecast closest to the requested date
      const forecast = response.data.list.find((entry) =>
        entry.dt_txt.startsWith(formattedDate)
      );
  
      if (!forecast) {
        return res.status(404).json({ error: "No forecast found for that date" });
      }
  
      const data = {
        temp: forecast.main.temp,
        wind: forecast.wind.speed,
        description: forecast.weather[0].description,
        precip: (forecast.pop || 0) * 100, // % chance of rain
      };
  
      res.json(data);
    } catch (err) {
      console.error("Weather fetch failed:", err.message);
      res.status(500).json({ error: "Error fetching weather" });
    }
  };
  


exports.analyzeWeather = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });

  const { location, date, eventType } = event;

  try {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
    );
    const forecast = response.data.list.find((entry) => entry.dt_txt.includes(date));
    const weather = {
      temp: forecast.main.temp,
      wind: forecast.wind.speed,
      description: forecast.weather[0].description,
      precip: forecast.pop * 100,
    };
    const score = calculateScore(weather, eventType);
    event.weatherAnalysis = { ...weather, score };
    await event.save();
    res.json({ weather, score });
  } catch (err) {
    res.status(500).json({ error: "Weather check failed" });
  }
};

exports.suitability = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event || !event.weatherAnalysis) {
    return res.status(404).json({ error: "No weather analysis yet" });
  }
  res.json({ suitability: event.weatherAnalysis.score });
};
