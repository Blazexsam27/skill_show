import React from "react";
import styled from "styled-components";

function QuestionForm(props) {
  const { handleQuestionSubmit, question, options } = props;
  const Wrapper = styled.div`
    width: ;
  `;

  return (
    <Wrapper>
      <form onSubmit={handleQuestionSubmit}>
        <p className="question-text">{question}</p>
        <label htmlFor="option1">{options[0]}</label>
        <input type="radio" name="option" id="option1" required />
        <label htmlFor="option2">{options[0]}</label>
        <input type="radio" name="option" id="option2" />
        <label htmlFor="option3">{options[0]}</label>
        <input type="radio" name="option" id="option3" />
        <label htmlFor="option4">{options[0]}</label>
        <input type="radio" name="option" id="option4" />
        <button type="submit">Next</button>
      </form>
    </Wrapper>
  );
}

export default QuestionForm;
