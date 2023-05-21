import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as openai from "openai";
import { Configuration, OpenAIApi } from "openai";
import QuestionForm from "../component/QuestionForm";

function TestPanel() {
  const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
  `;

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_GPT_API,
  });
  delete configuration.baseOptions.headers["User-Agent"];
  const openai = new OpenAIApi(configuration);

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const systemMessage = {
    role: "system",
    content: "Generate question for a intermediate level programmer.",
  };

  function processAPIResponse(mcq_questions) {
    let question, options, lines;
    mcq_questions.map((element) => {
      lines = element.split("\n");
      question = lines[1].replace("Question: ", "");
      options = {
        a: lines[3].slice(4),
        b: lines[4].slice(4),
        c: lines[5].slice(4),
        d: lines[6].slice(4),
      };
      console.log("question", question);
      console.log("options", options);
    });
  }

  function extractOptions(optionsString) {
    const options = optionsString
      .split("\n")
      .map((option) => option.trim())
      .filter((option) => option !== ""); // Filter out empty options

    return options;
  }

  const generateQuestions = async () => {
    const numQuestions = 5;

    // Generate multiple questions
    const prompts = Array(numQuestions).fill(
      "### Multiple-Choice Question\n\nQuestion: Which of the following options is correct?\n\na) Option A\nb) Option B\nc) Option C\nd) Option D\n\nAnswer: "
    );

    const response = await openai.createCompletion({
      engine: "text-davinci-003",
      prompt: prompts,
      maxTokens: 2048,
      temperature: 0.5,
    });
    const parsedData = await response.json();
    console.log(parsedData);
    // .then((response) => {
    //   const choices = response.choices;
    //   const generatedQuestions = choices.map((choice) => {
    //     const generatedQuestion = choice.text.trim();
    //     const lines = generatedQuestion.split("\n");
    //     const question = lines[0].replace("Question: ", "");
    //     const options = {
    //       a: lines[1].slice(4),
    //       b: lines[2].slice(4),
    //       c: lines[3].slice(4),
    //       d: lines[4].slice(4),
    //     };
    //     const answer = lines[6].slice(8);
    //     console.log("question", question);
    //     console.log("options", options);
    //     console.log("answer", answer);
    //     return { question, options, answer };
    //   });

    //   setQuestions(generatedQuestions);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
    // processAPIResponse(mcq_questions);
  };

  const evaluateResults = (e) => {
    e.preventDefault();
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  return (
    <Wrapper>
      {/* <QuestionForm
        handleQuestionSubmi={handleQuestionSubmit}
        evaluateResults={evaluateResults}
        question={questionList[index]}
        options={optionsList[index]}
      /> */}
    </Wrapper>
  );
}

export default TestPanel;
