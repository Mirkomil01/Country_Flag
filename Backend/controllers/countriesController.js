const axios = require("axios");

let cachedCountries = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 soat

async function getAllCountries(req, res) {
  try {
    const now = Date.now();

    if (!cachedCountries || now - cacheTime > CACHE_DURATION) {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      cachedCountries = response.data.filter(
        (c) => c.capital && c.flags && (c.flags.svg || c.flags.png)
      );
      cacheTime = now;
    }

    res.json(cachedCountries);
  } catch (error) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
}

module.exports = {
  getAllCountries,
};
