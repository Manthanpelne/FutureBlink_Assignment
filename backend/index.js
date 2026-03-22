// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const { FlowResult } = require('./models/flowModel');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


// 1. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));



// 3. AI Route (OpenRouter)
app.post('/api/ask-ai', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "*", 
          "X-Title": "AI Flow Builder",
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    res.json({ answer: aiMessage });
  } catch (error) {
    console.error("OpenRouter Error Details:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: "AI Fetch Failed",
      details: error.response?.data?.error?.message || "Check API Key/Quota"
    });
  }
});



// 4. Save Route
app.post('/api/save', async (req, res) => {
  try {
    const { prompt, response } = req.body;
    if (!prompt || !response) {
      return res.status(400).json({ error: "Missing prompt or response content" });
    }
    const newEntry = new FlowResult({ prompt, response });
    await newEntry.save();
    
    res.status(201).json({ message: "Flow saved to MongoDB successfully!" });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ error: "Failed to save to database" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));