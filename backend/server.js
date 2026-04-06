const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const googleTTS = require('google-tts-api');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Initialize Groq
let groq;
const groqApiKey = process.env.GROQ_API_KEY;
try {
  if (groqApiKey) {
    groq = new Groq({ apiKey: groqApiKey });
  } else {
    console.warn("Groq initialization skipped: GROQ_API_KEY is missing.");
  }
} catch (error) {
  console.warn("Groq initialization failed. Make sure to set GROQ_API_KEY.");
}

app.post('/api/generate', async (req, res) => {
  try {
    const { businessType, offer, language } = req.body;

    if (!businessType || !offer || !language) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!groq) {
      return res.status(500).json({ error: "Groq SDK not initialized. Missing API Key." });
    }

    const prompt = `Generate a short, catchy marketing caption for a small Indian business.\n\nBusiness Type: ${businessType}\nOffer: ${offer}\nLanguage: ${language}\n\nMake it simple, local, and engaging. Keep it under 2 lines.`;

    // Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: GROQ_MODEL,
    });

    const caption = chatCompletion.choices[0]?.message?.content || "Caption generation failed.";

    // Call Google TTS
    // google-tts-api generates a URL to the spoken text
    // The language param should ideally be a valid lang code (en, hi, etc.)
    // We map generic language string to a rough estimation or fallback to 'en'
    let langCode = 'en';
    if (language.toLowerCase().includes('hindi')) langCode = 'hi';
    else if (language.toLowerCase().includes('tamil')) langCode = 'ta';
    else if (language.toLowerCase().includes('telugu')) langCode = 'te';
    else if (language.toLowerCase().includes('marathi')) langCode = 'mr';

    const audioUrl = googleTTS.getAudioUrl(caption, {
      lang: langCode,
      slow: false,
      host: 'https://translate.google.com',
    });

    res.json({
      caption,
      audioUrl
    });

  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal server error", details: error.message, stack: error.stack });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
