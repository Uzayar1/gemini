const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Gemini API key ထည့်ရမည့်နေရာ
const GEMINI_API_KEY = "AIzaSyD6WDNTdGS5NMw_Dh7ciXrCfuY6bNIKu9k";

app.post("/gemini", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            }
        );

        const data = await response.json();
        let reply = data.candidates[0].content.parts[0].text;
        res.json({ reply });
    } catch (e) {
        console.error(e);
        res.status(500).json({ reply: "Server error" });
    }
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
