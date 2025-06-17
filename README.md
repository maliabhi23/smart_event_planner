# 🌤️ Smart Event Planner Backend

The **Smart Event Planner** is a backend system that helps users plan outdoor events by analyzing weather data from the **OpenWeatherMap API** and recommending suitable dates with optimal weather conditions.

---

## 📁 Project Structure
 ```text smart-event-planner/ │ ├── index.js # Entry point of the application ├── routes/ │ └── events.js # API route for handling event planning requests ├── controllers/ │ └── eventController.js # Main logic: weather fetching, scoring, and recommendations ├── models/ │ └── event.js # (Optional) Schema/model for event data ├── utils/ │ └── weatherUtils.js # (Optional) Helpers: scoring algorithm, weather filters ├── .env # Contains sensitive API keys (not committed) ├── package.json # Project metadata and dependencies └── README.md # Project documentation ``
---

## ⚙️ Features

- 🌦️ **Weather Integration**: Fetches current and forecast weather data using OpenWeatherMap API.
- 📊 **Weather Scoring Algorithm**: Assigns suitability scores to weather based on:
  - Temperature range
  - Rain prediction
  - Wind speed
  - Humidity
- 📅 **Date Recommendations**: Suggests alternate dates with better weather for outdoor events.
- 📌 **Location-Based Suggestions**: Works with any city or location using lat/lon or city name.
- 📤 **REST API Endpoint**: Accepts event details and returns analyzed weather and recommendation.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-event-planner.git
cd smart-event-planner


### 2. npm install

### 3. Setup .env file
OPENWEATHERMAP_API_KEY=your_api_key_here
mongodb_url

### 4. Currently i deploy on the render you check by the adding endpoints
https://smart-event-planner.onrender.com


### 5. Run the server
node index.js





