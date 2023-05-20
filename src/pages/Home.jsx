import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/userContext";
import InfoSection from "../component/InfoSection";
//samblaze275581
function Home() {
  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 70vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.josefin};
    .error-indicator {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.warning};
    }
    label {
      font-size: 1.5rem;
    }
    .input-and-submit {
      display: flex;
      gap: 10px;

      input {
        padding: 10px;
        width: 450px;
        border-radius: 7px;
        font-size: 1.5rem;
        font-family: ${({ theme }) => theme.fonts.josefin};
      }
      button {
        border: none;
        border-radius: 7px;
        transition: 0.4s;
        background: ${({ theme }) => theme.colors.sasquatch};
        color: ${({ theme }) => theme.colors.white};
        padding: 10px 25px;
        font-size: 1.5rem;
        font-family: ${({ theme }) => theme.fonts.josefin};

        &:hover {
          transform: scale(0.98);
          transition: 0.4s;
        }
      }
    }
  `;

  const inputRef = useRef();
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userDetailsState, setUserDetailsState] = useState({});
  const [userTechStackState, setUserTechStackState] = useState([]);
  const { getUserDetails } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { parsedUserDetails, userTechStack, status } = await getUserDetails(
      inputRef.current.value
    );
    setUserDetailsState(parsedUserDetails);
    setUserTechStackState(userTechStack);
    setIsSubmitted(status);
  };
  return (
    <>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Showcase Username</label>
          <div className="input-and-submit">
            <input type="text" autoComplete="off" ref={inputRef} />
            <button type="submit">Submit</button>
          </div>
          {error.length > 1 ? <p className="error-indicator"></p> : ""}
        </form>
      </Wrapper>

      {isSubmitted ? (
        <InfoSection
          userDetails={userDetailsState}
          userTechStack={userTechStackState}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
