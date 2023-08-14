import { useState } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./routes/Router";
import styled from "styled-components";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(current => !current);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ToggleButton onClick={toggleDark}>{isDark ? "🌞" : "🌙"}</ToggleButton>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0.5em;
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
`
