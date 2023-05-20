import React from "react";
import styled from "styled-components";

function CategoryButton(props) {
  const Wrapper = styled.div`
    border-radius: 7px;
    padding: 10px 25px;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.helper};
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.04);
      transition: 0.3s;
    }
  `;

  return <Wrapper>{props.data}</Wrapper>;
}

export default CategoryButton;
