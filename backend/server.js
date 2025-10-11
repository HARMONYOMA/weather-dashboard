const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" })); // or specify your Netlify URL instead of "*"
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running 🚀"));

app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
