import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/userContext";
import InfoSection from "../component/InfoSection";
import PuffLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

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
    .header {
      text-align: center;
      margin-right: 10px;
      font-size: 78px;
      font-family: var(--ubuntu-font);
      font-weight: bolder;
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
    @media (max-width: ${({ theme }) => theme.media.tab}) {
      .header {
        font-size: 56px;
      }
      .input-and-submit {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input {
          width: 450px;
        }
      }
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .header {
        font-size: 36px;
      }
      .input-and-submit {
        flex-direction: column;
        input {
          width: 450px;
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
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { parsedUserDetails, userTechStack, status } = await getUserDetails(
      inputRef.current.value
    );
    setUserDetailsState(parsedUserDetails);
    setUserTechStackState(userTechStack);
    setIsSubmitted(status);

    setLoader(false);
  };

  return (
    <>
      <Wrapper>
        <p className="header">
          Brush Up Your <span style={{ color: "#FC427B" }}>Showcase</span> Tech
          Stack
        </p>
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
        <div>
          <PuffLoader
            color={"#FC427B"}
            loading={loader}
            cssOverride={override}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}

export default Home;
