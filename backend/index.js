const express = require("express");
require("dotenv").config();
const app = express();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.GPT_API,
});
app.use(express.json());

const openai = new OpenAIApi(config);

const generateMcq = async (prompt) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0.1,
    n: 1,
    prompt: prompt,
    stop: null,
  });
  console.log(completion.data.choices[0].text.trim());
  return completion.data.choices[0].text.trim();
};

app.post("/api/test", async (req, res) => {
  const { prompt } = req.body;
  const questions = [];
  for (let i = 0; i < 3; i++) {
    const questionPrompt = `${prompt}\nVariation: ${i + 1}`;
    const mcq = await generateMcq(questionPrompt);

    const lines = mcq.split("\n");
    const question = lines[0].trim();
    const options = lines.slice(1, 5).map((option) => option.substring(3));
    const answer = lines[5].trim();
    questions.push({ question, options, answer });
  }

  console.log(questions);
  res.send({ questions });
});

app.listen(8080, () => {
  console.log("Server is listening at port 8080");
});
