// ==========================
// 🌦️ WEATHER DASHBOARD SCRIPT
// ==========================

// Base API URL (use your Render deployment)
const API_BASE_URL = "https://weather-dashboard-backend-8pfp.onrender.com";

// Fetch and display weather for a given city
async function getWeather(cityFromFavorite = null) {
  const cityInput = document.getElementById("cityInput");
  const weatherDiv = document.getElementById("weather");
  const city = cityFromFavorite || cityInput.value.trim();

  if (!city) {
    weatherDiv.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  // Save last viewed city
  localStorage.setItem("lastCity", city);

  try {
    // Get city coordinates
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      weatherDiv.innerHTML = `<p>❌ City not found. Try again.</p>`;
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Fetch weather data from your Render backend
    const weatherRes = await fetch(`${API_BASE_URL}/api/weather?lat=${latitude}&lon=${longitude}`);
    const weatherData = await weatherRes.json();

    if (!weatherData.current_weather) {
      weatherDiv.innerHTML = `<p>⚠️ Could not fetch weather data.</p>`;
      return;
    }

    const { temperature, windspeed, weathercode } = weatherData.current_weather;

    // Weather icons
    const icons = {
      0: "☀️ Clear sky",
      1: "🌤️ Mostly clear",
      2: "⛅ Partly cloudy",
      3: "☁️ Overcast",
      45: "🌫️ Fog",
      48: "🌫️ Rime fog",
      51: "🌦️ Light drizzle",
      61: "🌧️ Rain",
      71: "🌨️ Snow",
      80: "🌦️ Rain showers",
      95: "⛈️ Thunderstorm",
    };
    const icon = icons[weathercode] || "🌍 Unknown";

    // Display result
    weatherDiv.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>${icon}</p>
      <p>🌡️ Temp: ${temperature}°C</p>
      <p>💨 Wind: ${windspeed} km/h</p>
      <button onclick="saveFavorite('${name}')">⭐ Save to Favorites</button>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherDiv.innerHTML = `<p>⚠️ Error loading weather. Please check your connection.</p>`;
  }
}

// ==========================
// 🌟 FAVORITES MANAGEMENT
// ==========================
function saveFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(city)) {
    alert(`${city} is already in your favorites.`);
    return;
  }

  favorites.push(city);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const listDiv = document.getElementById("favoritesList");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  listDiv.innerHTML = "";

  if (favorites.length === 0) {
    listDiv.innerHTML = `<p>No favorite cities yet.</p>`;
    return;
  }

  favorites.forEach(city => {
    const div = document.createElement("div");
    div.className = "fav-item";
    div.innerHTML = `
      <span class="fav-city" onclick="getWeather('${city}')">${city}</span>
      <button class="delete-btn" onclick="deleteFavorite('${city}')">🗑️</button>
    `;
    listDiv.appendChild(div);
  });
}

function deleteFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(item => item !== city);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function clearFavorites() {
  if (confirm("Are you sure you want to clear all favorites?")) {
    localStorage.removeItem("favorites");
    renderFavorites();
  }
}

// ==========================
// 🚀 INITIALIZATION
// ==========================
window.onload = () => {
  renderFavorites();

  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("cityInput").value = lastCity;
    getWeather(lastCity);
  }
};
