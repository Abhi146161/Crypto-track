import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cryptopanic.com/api/developer/v2/posts/?auth_token=e33fd4ebacb24a41ffbab02983cb75bf7d618347"
    );

    console.log("✅ API fetched, results:", response.data.results?.length || 0);
    res.json(response.data.results || []);
  } catch (error) {
    console.error("❌ Backend error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
