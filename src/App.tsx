import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./routes/Router";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from './recoil/atoms';

import styled from "styled-components";
import ToggleButton from "react-dark-mode-toggle";

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <DarkModeToggleBtn
          onChange={toggleDarkAtom}
          checked={isDark}
          size={50}
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
  top: 3vh;
  right: 3%;
`