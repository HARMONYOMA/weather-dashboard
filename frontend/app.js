async function getWeather(cityFromFavorite = null) {
  const cityInput = document.getElementById("cityInput");
  const city = cityFromFavorite || cityInput.value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  // Save last viewed city
  localStorage.setItem("lastCity", city);

  // Fetch coordinates
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    weatherDiv.innerHTML = `<p>City not found. Try again.</p>`;
    return;
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // Fetch weather data
  const res = await fetch(`http://localhost:4000/api/weather?lat=${latitude}&lon=${longitude}`);
  const data = await res.json();

  if (data.current_weather) {
    const { temperature, windspeed, weathercode } = data.current_weather;

    // Map weather codes to icons
    const icons = {
      0: "☀️ Clear sky",
      1: "🌤️ Mostly clear",
      2: "⛅ Partly cloudy",
      3: "☁️ Overcast",
      45: "🌫️ Fog",
      48: "🌫️ Depositing rime fog",
      51: "🌦️ Light drizzle",
      61: "🌧️ Rain",
      71: "🌨️ Snowfall",
      80: "🌦️ Rain showers",
      95: "⛈️ Thunderstorm",
    };
    const icon = icons[weathercode] || "🌍";

    weatherDiv.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>${icon}</p>
      <p>🌡️ Temp: ${temperature}°C</p>
      <p>💨 Wind: ${windspeed} km/h</p>
      <button onclick="saveFavorite('${name}')">⭐ Save to Favorites</button>
    `;
  } else {
    weatherDiv.innerHTML = `<p>Could not fetch weather data.</p>`;
  }
}

// Save favorites (no duplicates)
function saveFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  } else {
    alert(`${city} is already in favorites.`);
  }
}

// Show favorite cities
function renderFavorites() {
  const listDiv = document.getElementById("favoritesList");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  listDiv.innerHTML = "";

  favorites.forEach(city => {
    const div = document.createElement("div");
    div.className = "fav-item";
    div.innerHTML = `
      <span onclick="getWeather('${city}')" style="cursor:pointer;">${city}</span>
      <button class="delete-btn" onclick="deleteFavorite('${city}')">🗑️</button>
    `;
    listDiv.appendChild(div);
  });
}

// Delete one favorite
function deleteFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(item => item !== city);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

// Clear all favorites
function clearFavorites() {
  localStorage.removeItem("favorites");
  renderFavorites();
}

// Auto-load last city and favorites
window.onload = () => {
  renderFavorites();
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("cityInput").value = lastCity;
    getWeather(lastCity);
  }
};
