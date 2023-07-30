import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  // interface 또는 const { coinId } = useParams<{ coinId: string; }>();
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  return (
    <>
      <Container>
        <Header>
          <Title>{state?.name || "Loading..."}</Title>
        </Header>
        <Section>
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            null
          )
          }
        </Section>
      </Container>
    </>
  );
};

export default Coin;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  font-weight: 700;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 24px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section``;