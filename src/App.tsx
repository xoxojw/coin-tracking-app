import { Helmet } from "react-helmet";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./routes/Router";

const App = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap" />
      </Helmet>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
