import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { NavLink } from "react-router-dom";
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
      background: ${({ theme }) => theme.colors.midnight};
      margin-bottom: 20px;
    }
    .info-text {
      font-size: 1.5rem;
      color: #fff;
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
      <div className="seperator"></div>
      <div className="skill-list-container">
        {userTechStack.map((item) => {
          return (
            <NavLink
              to={"/explore"}
              state={{ topic: item.stack.name }}
              key={item.stack.name}
            >
              <CategoryButton data={item.stack.name} />
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default InfoSection;
