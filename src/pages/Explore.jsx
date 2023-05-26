import React, { useEffect, useState, useRef } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import PuffLoader from "react-spinners/PuffLoader";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Explore() {
  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    font-family: var(--josefin-font);
    .header {
      font-size: 108px;
      margin-top: 50px;
      margin-bottom: 30px;
    }
    .subheader {
      text-align: center;
      font-size: 3rem;
    }
    .center-text{
      text-align: center;
    }
    .nav-strip{
        display: flex;
        justify-content: start;
        width: 75vw;
        margin-top: 20px;
        margin-left: 20px;
        .home-btn{
            border: none;
            border-radius: 3px;
            padding: 10px 35px;
            text-align: center;
        }
    }
    
    .points {
      font-size: 1.5rem;
    }
    .breif-container {
      width: 75%;
      font-size: 1.5rem;
    }
    .btn-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .bg-colorized:{
        width: 100%;
        background: ${({ theme }) => theme.colors.midnight}
        color: white;
    }
    button {
      border: none;
      border-radius: 3px;
      padding: 10px 35px;
      transition: 0.4s;
      background: ${({ theme }) => theme.colors.midnight};
      color: #fff;
      &:hover {
        transform: scale(1.03);
        transition: 0.4s;
      }
    }
  `;
  const roadmapRef = useRef(null);
  const resourcesRef = useRef(null);
  const location = useLocation();
  const [roadMap, setRoadmap] = useState("");
  const [resources, setResources] = useState("");
  const [breifLoader, setBreifLoader] = useState(false);
  const [roadMapLoader, setRoadmapLoader] = useState(false);
  const [resourcesLoader, setResourcesLoader] = useState(false);
  const [breif, setBreif] = useState("");

  useEffect(() => {
    generateBreif();
  }, []);

  const handleResourcesScroll = () => {
    resourcesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleRoadmapScroll = () => {
    roadmapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateBreif = async () => {
    setBreifLoader(true);
    const response = await fetch("/api/explore/breif", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Please generate a breif about ${location.state.topic} topic.`,
      }),
    });
    const parsedResponse = await response.json();
    setBreif(parsedResponse.data);
    setBreifLoader(false);
  };

  const generateRoadMap = async () => {
    if (roadMap === "") {
      setRoadmapLoader(true);
      const response = await fetch("/api/explore", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Please generate a roadmap to learn about ${location.state.topic} technogoly.`,
        }),
      });
      const parsedResponse = await response.json();
      setRoadmap(parsedResponse.lines);
      setRoadmapLoader(false);
    }
  };

  const generateResources = async () => {
    if (resources === "") {
      setResourcesLoader(true);
      const response = await fetch("/api/explore", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Please generate a some good resources to learn about ${location.state.topic} topic, also generate links if possible.`,
        }),
      });
      const parsedResponse = await response.json();
      setResources(parsedResponse.lines);
      setResourcesLoader(false);
    }
  };

  return (
    <Wrapper>
      <div className="nav-strip">
        <NavLink to={"/"}>
          <button className="home-btn">Home</button>
        </NavLink>
      </div>
      <p className="header">{location.state.topic}</p>
      <div className="breif-container">
        {!breifLoader ? (
          <p className="breif">{breif}</p>
        ) : (
          <div style={{ marginTop: "15px", marginBottom: "20px" }}>
            {breifLoader ? (
              <p className="points center-text">Loading Breif</p>
            ) : (
              ""
            )}

            <PuffLoader
              color={"#00cec9"}
              loading={breifLoader}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>

      <div className="btn-container">
        <button
          onClick={() => {
            generateRoadMap();
            handleResourcesScroll();
          }}
        >
          Generate Roadmap
        </button>
        <button
          onClick={() => {
            generateResources();
            handleRoadmapScroll();
          }}
        >
          Generate Resources
        </button>
      </div>
      <div className="breif-container bg-colorized">
        {roadMap.length > 1 ? (
          <div className="roadmap" ref={roadmapRef}>
            <p className="subheader">Roadmap</p>
            {roadMap.map((item) => {
              if (item.length > 1) {
                return (
                  <p className="points" key={item}>
                    {item}
                  </p>
                );
              }
            })}
          </div>
        ) : (
          <div style={{ marginTop: "15px" }}>
            {roadMapLoader ? (
              <p className="points center-text">Generating Roadmap</p>
            ) : (
              ""
            )}

            <PacmanLoader
              color={"#2c3e50"}
              loading={roadMapLoader}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {resources.length > 1 ? (
          <div className="resources" ref={resourcesRef}>
            <p className="subheader">Resources</p>
            {resources.map((item) => {
              if (item.length > 1)
                return (
                  <p className="points" key={item}>
                    {item}
                  </p>
                );
            })}
          </div>
        ) : (
          <div style={{ marginTop: "15px" }}>
            {resourcesLoader ? (
              <p className="points center-text">Generating Resources</p>
            ) : (
              ""
            )}

            <PacmanLoader
              color={"#2c3e50"}
              loading={resourcesLoader}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default Explore;
