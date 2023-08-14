import { useState } from "react";
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./routes/Router";

import styled from "styled-components";
import ToggleButton from "react-dark-mode-toggle";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(current => !current);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <DarkModeToggleBtn
          onChange={toggleDark}
          checked={isDark}
          size={60}
          speed={1.5}
        />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;

const DarkModeToggleBtn = styled(ToggleButton)`
  position: absolute;
  top: 2vh;
  right: 2vh;
`