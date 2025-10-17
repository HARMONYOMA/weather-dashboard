
# Weather Dashboard

A simple and elegant full-stack weather app that lets users search for any city, view real-time weather conditions, and save favorite cities built using HTML, CSS, JavaScript, Node.js (Express), and Open-Meteo API.

## 🔗 Live Demo
Frontend: [View on Netlify](https://weatherdboard.netlify.app/)

Backend API: [View on Render](https://weather-dashboard-backend-8pfp.onrender.com/)


## Project Overview

This project demonstrates how to integrate a frontend interface with a Node.js backend to fetch real-time weather data from an external API.
Users can:

-  Search weather by city name

- Save favorite cities locally

- View weather details such as temperature, wind speed, and condition codes

- Automatically load the last viewed city on page refresh
## Tech Stack

#### Frontend:

* HTML5

* CSS3

* Vanilla JavaScript

#### Backend:
* Node.js

* Express.js

* dotenv

* CORS

#### External API:
* Open-Meteo Weather API

* Open-Meteo Geocoding API

#### Deployment:
* Frontend → Netlify

* Backend → Render
## Project Structure
```
weather-dashboard/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── index.html
    ├── app.js
    └── style.css
  ``` 
  How It Works
- User enters a city name on the frontend
- The frontend sends a request to the backend with the city’s latitude and longitude
- The backend fetches real-time weather data from Open-Meteo API
- Weather information is displayed dynamically
- User can save favorite cities and revisit them later
## Features

- Search weather by any city
- View live weather details
- Save favorite cities (localStorage)
- Delete or clear favorites
- Automatically load last viewed city

## Setup Instructions
1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```
2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file (optional, for future API keys):
```ini
PORT=4000
```
Run server:
```bash
node server.js
```
3️⃣ Frontend Setup
```bash
cd ../frontend
npx serve .
```
Open browser → http://localhost:3000

### Deployment
Backend: Deployed on [Render](https://render.com)

Frontend: Deployed on [Netlify](https://netlify.com)

Make sure the frontend app.js fetches from your deployed backend:
```js
const BACKEND_URL = "https://weather-dashboard-backend-8pfp.onrender.com";
```



## Learning Highlights

Integrated frontend & backend with REST API calls

Used fetch() and async/await for asynchronous JavaScript

Practiced working with CORS, environment variables, and deployment pipelines

Improved UX with localStorage persistence
## Authors

- [@anigboguchioma](https://medium.com/@anigbogup)

