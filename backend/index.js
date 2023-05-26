const express = require("express");
require("dotenv").config();
const app = express();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.GPT_API,
});
app.use(express.json());

const openai = new OpenAIApi(config);

const generateResponse = async (prompt) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 2048,
    temperature: 1,
    prompt: prompt,
    stop: null,
  });
  return completion.data.choices[0].text.trim();
};

app.post("/api/explore/breif", async (req, res) => {
  const { prompt } = req.body;

  const requestPrompt = `${prompt}`;
  const data = await generateResponse(requestPrompt);

  res.send({ data });
});

app.post("/api/explore", async (req, res) => {
  const { prompt } = req.body;

  const requestPrompt = `${prompt}`;
  const data = await generateResponse(requestPrompt);

  const lines = data.split("\n");
  res.send({ lines });
});

app.listen(8080, () => {
  console.log("Server is listening at port 8080");
});
