const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Google API Key
const SEARCH_ENGINE_ID = "YOUR_SEARCH_ENGINE_ID"; // Google Search Engine ID

// AI Search Route
app.get("/search", async (req, res) => {
  const query = req.query.q;
  const googleURL = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}`;
  const wikiURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

  try {
    console.log("🔍 Received Query:", query); // Debugging log

    // Parallel API calls
    const [googleRes, wikiRes] = await Promise.all([
      axios.get(googleURL),
      axios.get(wikiURL),
    ]);

    console.log("✅ Google API Response:", googleRes.data);
    console.log("✅ Wikipedia API Response:", wikiRes.data);

    // Handle missing data
    const googleResults = googleRes.data.items
      ? googleRes.data.items.map((item) => item.snippet)
      : ["No Google results found"];

    const wikiResult = wikiRes.data.extract || "No Wikipedia data found";

    res.json({ google: googleResults, wiki: wikiResult });
  } catch (error) {
    console.error("❌ API Fetch Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching data", details: error.message });
  }
});

// Server Listening
app.listen(5000, () => console.log("✅ Server running on port 5000"));
