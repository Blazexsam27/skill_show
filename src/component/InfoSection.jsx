import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import styled from "styled-components";
import CategoryButton from "./CategoryButton";

function InfoSection(props) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 65vh;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.josefin};
    background: ${({ theme }) => theme.colors.sasquatch};

    .greet {
      font-size: 3rem;
      font-weight: bolder;
      color: ${({ theme }) => theme.colors.white};
    }
    .seperator {
      width: 100%;
      height: 40px;
      background: #f78fb3;
      margin-bottom: 20px;
    }

    .skill-list-container {
      display: flex;
      gap: 10px;
      flex-direction: column;
      flex-wrap: wrap;
      width: 80vw;
      height: 30vh;
    }
  `;
  const { userDetails, userTechStack } = props;
  console.log(userDetails);
  console.log(userTechStack);

  return (
    <Wrapper>
      <p className="greet">👋 {userDetails.displayName}</p>
      <p className="info-text">
        You will get 10 random generated MCQs which you need to solve within
        given time limit.
      </p>
      <div className="seperator"></div>
      <div className="skill-list-container">
        {userTechStack.map((item) => {
          return <CategoryButton data={item.stack.name} />;
        })}
      </div>
    </Wrapper>
  );
}

export default InfoSection;
