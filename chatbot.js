const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY",  // Replace this with your actual key
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are an AI assistant for a travel website. Answer FAQs about Hajj, Umrah, visa requirements, ticket bookings, and travel packages." },
        { role: "user", content: userMessage },
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.send({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    res.status(500).send({ reply: "Sorry, I couldn't process your request." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
