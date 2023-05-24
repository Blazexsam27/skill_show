import React from "react";
import styled from "styled-components";

function QuestionForm(props) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    min-width: 65vw;
    min-height: 35vh;
    background: ${({ theme }) => theme.colors.bg};
    .submit-btn {
      border: none;
      border-radius: 3px;
      padding: 10px 35px;
      background: ${({ theme }) => theme.colors.sasquatch};
      margin-top: 20px;
      color: white;
      &:hover {
        transform: scale(1.03);
        transition: 0.4s;
      }
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      div {
        padding: 5px;
      }
    }
  `;

  const { selectedAnswers, setSelectedAnswers, data, setIndex, index } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAns = e.target.option.value;
    setSelectedAnswers((prev) => {
      return [...prev, selectedAns];
    });
    if (setIndex < 10) setIndex((prev) => prev + 1);
    else console.log("All question done");
    console.log(selectedAnswers);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <p className="question-text">
          Q{index + 1}) {data.question}
        </p>

        <div className="options-container">
          <div>
            <input
              type="radio"
              name="option"
              id="option1"
              value="option1"
              required
            />
            <label htmlFor="option1">{data.options[0]}</label>
          </div>
          <div>
            <input type="radio" name="option" id="option2" value="option2" />
            <label htmlFor="option2">{data.options[1]}</label>
          </div>
          <div>
            <input type="radio" name="option" id="option3" value="option3" />
            <label htmlFor="option3">{data.options[2]}</label>{" "}
          </div>
          <div>
            <input type="radio" name="option" id="option4" value="option4" />
            <label htmlFor="option4">{data.options[3]}</label>
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Next
        </button>
      </form>
    </Wrapper>
  );
}

export default QuestionForm;
