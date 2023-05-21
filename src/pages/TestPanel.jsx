import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionForm from "../component/QuestionForm";

function TestPanel() {
  const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
  `;

  const [questionList, setQuestionList] = useState([]);
  const [optionsList, setOptionsList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [index, setIndex] = useState(0);
  const systemMessage = {
    role: "system",
    content: "Generate question for a intermediate level programmer.",
  };

  function processAPIResponse(choices) {
    // const mcqs = [];
    // let questions = [];
    // let optionList = [];
    // let answerList = [];
    // choices.forEach((choice) => {
    //   if (choice.message && choice.message.content) {
    //     const questionWithOptions = choice.message.content.trim();
    //     const questionEndIndex = questionWithOptions.indexOf("?");
    //     const question = questionWithOptions.slice(0, questionEndIndex + 1);
    //     const optionsString = questionWithOptions.slice(questionEndIndex + 1);
    //     const options = extractOptions(optionsString);
    //     optionList.push([...options]);
    //     mcqs.push({ question, options });
    //   }
    // });
    // for (let i = 1; i < 5; i++) {
    //   for (let j = 0; j < 6; j++) {
    //     if (
    //       mcqs[i].options[j].match(/answer/) ||
    //       mcqs[i].options[j].match(/Answer/)
    //     ) {
    //       let correctOption = mcqs[i].options[j]
    //         .slice(-2)
    //         .replace(/[^A-Za-z']/g, "");
    //       answerList.push(correctOption);
    //     }
    //   }
    //   let filteredQuestionString = mcqs[i].question.replace(/\n/g, "");
    //   questions.push(filteredQuestionString);
    // }
    // setQuestionList(questions);
    // setOptionsList(optionList);
    // setAnswerList(answerList);
    // console.log("Questions", questions);
    // console.log("Answers", answerList);
    // console.log("Options", optionList);

    const generatedQuestions = choices.map((choice) => {
      const generatedQuestion = choice.text.trim();
      const lines = generatedQuestion.split("\n");
      const question = lines[0].replace("Question: ", "");
      const options = {
        a: lines[1].slice(4),
        b: lines[2].slice(4),
        c: lines[3].slice(4),
        d: lines[4].slice(4),
      };
      const answer = lines[6].slice(8);
      console.log("question", question);
      console.log("options", options);
      console.log("answer", answer);
      return { question, options, answer };
    });

    setQuestions(generatedQuestions);
  }

  function extractOptions(optionsString) {
    const options = optionsString
      .split("\n")
      .map((option) => option.trim())
      .filter((option) => option !== ""); // Filter out empty options

    return options;
  }

  const generateQuestions = async () => {
    const response = await fetch(
      "https://api.openai.com/v1/engines/code-davinci-001/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GPT_API}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          n: 5,
          max_tokens: 100,
          temperature: 0.2,
          prompt: `### Multiple-Choice Question\n\n
                    Question: Which of the following options is correct?\n\n
                    a) Option A\n
                    b) Option B\n
                    c) Option C\n
                    d) Option D\n\n
                    Answer: a)`,
          messages: [
            systemMessage,
            {
              role: "user",
              content: `Please generate array of 6 MCQs regarding react framework along with their answers.`,
            },
          ],
        }),
      }
    );
    let eachQuestion = []; // list of question which user will see.
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    processAPIResponse(parsedResponse.choices);
    setQuestions(eachQuestion);
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
