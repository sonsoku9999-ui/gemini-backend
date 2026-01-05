import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = AIzaSyAdOvWYq4WNNtYGXiEnEUKdNxjE8OAyLPY

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server đang chạy ở cổng 3000");
});

