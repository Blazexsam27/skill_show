import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionForm from "../component/QuestionForm";

function TestPanel(props) {
  const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    font-family: var(--josefin-font);
    font-size: 1.3rem;
    .instructions {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      padding: 10px;
    }
    .start-btn {
      border: none;
      border-radius: 3px;
      min-width: 100px;
      padding: 10px 45px;
      background: ${({ theme }) => theme.colors.sasquatch};
      color: white;
      transition: 0.4s;
      &:hover {
        transform: scale(1.05);
        transition: 0.4s;
      }
    }
  `;
  const subject = "javascript language";
  const [questionSet, setQuestionSet] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const getQuestions = async () => {
    const response = await fetch("/api/test", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        prompt: `Please generate an MCQ with answer on ${subject} in this format\n Question: Which of the following options is correct?\n a) Option A\n b) Option B\n c) Option C\n d) Option D\n Answer: a)`,
      }),
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse.questions);
    // setQuestionSet(parsedResponse.questions);
  };

  useEffect(() => {
    // getQuestions();
  }, []);

  /* testing json data
   */
  let tempQuestion = [
    {
      question: "what the dog doin?",
      options: ["opt1", "opt2", "opt3", "opt4"],
      answer: "a)",
    },
    {
      question: "who was doing the party?",
      options: ["opt1", "opt2", "opt3", "opt4"],
      answer: "b)",
    },
  ];

  return (
    <Wrapper>
      <div className="instructions">
        <b>Important Rules:</b>
        <p>
          ⭐ You'll be given a set of 10 questions based on your selected topics
          with four options each.
        </p>
        <p>
          ⭐ You'll be given a time limit of overall 10 mins to complete as many
          questions as possible.
        </p>
        <p>
          ⭐ Once a answer is submitted you cannot move to previous question.
        </p>
        <p>
          ⭐ If timit limit expires all your test will be submitted
          automatically and you will get the evaluated result.
        </p>
      </div>
      <button className="start-btn">Start</button>
      <QuestionForm
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        setIndex={setIndex}
        index={index}
        data={tempQuestion[index]}
      />
    </Wrapper>
  );
}

export default TestPanel;
