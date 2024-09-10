const express = require("express");
const axios = require("axios");
const Detection = require("../models/Detection");
const router = express.Router();

// POST route for detecting language
router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const response = await axios.post(
      `${process.env.AZURE_LANGUAGE_ENDPOINT}/text/analytics/v3.1/languages`,
      { documents: [{ id: "1", text }] },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.AZURE_LANGUAGE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const languageData = response.data.documents[0];
    const detectedLanguage = languageData.detectedLanguage;

    // Save detection result to MongoDB
    const newDetection = new Detection({
      text,
      language: detectedLanguage.name,
      confidence: detectedLanguage.confidenceScore,
    });

    await newDetection.save();

    res.json(newDetection);
  } catch (error) {
    console.error("Error detecting language:", error);
    res.status(500).json({ error: "Failed to detect language" });
  }
});

module.exports = router;
