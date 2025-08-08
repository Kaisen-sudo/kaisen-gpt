import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(".")); // Sert index.html, style.css, script.js

app.post("/api/kaisen-chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Tu es KAISEN GPT, un assistant utile et concis." },
                    { role: "user", content: userMessage }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Erreur API" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`KAISEN GPT running on port ${PORT}`));
