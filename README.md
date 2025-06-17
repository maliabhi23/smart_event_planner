# 🌤️ Smart Event Planner Backend
The **Smart Event Planner** is a backend system that helps users plan outdoor events by analyzing weather data from the **OpenWeatherMap API** and recommending suitable dates with optimal weather conditions.

---

## 📁 Project Structure

```
smart-event-planner/
│
├── index.js                    # Entry point of the application
├── routes/
│   └── events.js              # API route for handling event planning requests
├── controllers/
│   └── eventController.js     # Main logic: weather fetching, scoring, and recommendations
├── models/
│   └── event.js               # (Optional) Schema/model for event data
├── utils/
│   └── weatherUtils.js        # (Optional) Helpers: scoring algorithm, weather filters
├── .env                       # Contains sensitive API keys (not committed)
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation
```

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
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env` file

Create a `.env` file in the root directory:

```env
OPENWEATHERMAP_API_KEY=your_api_key_here
MONGO_URI=mongodb_url_pastehere
```

### 4. Run the server

```bash
node index.js
```

---

## 📡 API Usage

### Endpoint

I deploy on the render

##https://smart-event-planner.onrender.com

```http

## 🧠 Weather Suitability Scoring

The algorithm considers the following weights (customizable):

| Factor      | Ideal Range  | Score Impact |
|-------------|--------------|--------------|
| Temperature | 20°C - 30°C  | +30 points   |
| Humidity    | 30% - 60%    | +20 points   |
| Wind Speed  | < 20 km/h    | +20 points   |
| Rain        | None         | +30 points   |

Events are ranked by total score out of 100.

---

## 📌 Future Enhancements

* ✅ Real-time weather alerts for last-minute event changes
* 📆 Google Calendar integration for automatic scheduling
* 📱 Frontend dashboard for users to plan visually
* 🌍 Multi-language and timezone support
* 📈 AI-based prediction using historical weather data

---

## 🔗 External Dependencies

* OpenWeatherMap API
* Express.js
* dotenv
* Axios or Node-Fetch

---

