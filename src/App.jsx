import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import styled, { ThemeProvider } from "styled-components";
import { UserProvider } from "./context/userContext";
import Explore from "./pages/Explore";

function App() {
  const Wrapper = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.bgScreen};
  `;

  const theme = {
    fonts: {
      josefin: "var(--josefin-font)",
    },
    colors: {
      heading: "rgb(24, 24, 29)",
      text: "rgba(29 ,29, 29, .8)",
      sasquatch: "#FC427B",
      white: "#fff",
      black: " #212529",
      picoVoid: "#192a56",
      darkSapphire: "#0c2461",
      bgScreen: "#fff",
      warning: "#e74c3c",
      midnight: "#2c3e50",
      helper: "#00cec9",
      bg: "#dfe4ea",
      footer_bg: "#0a1435",
      border: "#0652DD",
      hr: "#ffffff",
      warmText: "rgba(29 ,29, 29, .8)",
      gradient: "linear-gradient(0deg, #1289A7 0%, rgb(98, 189, 252) 100%)",
      shadow: `-webkit-box-shadow: 0px 0px 11px 3px rgba(204,204,204,1);
        -moz-box-shadow: 0px 0px 11px 3px rgba(204,204,204,1);
        box-shadow: 0px 0px 11px 3px rgba(204,204,204,1);`,
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Wrapper>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/explore" element={<Explore />}></Route>
              </Routes>
            </BrowserRouter>
          </Wrapper>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
