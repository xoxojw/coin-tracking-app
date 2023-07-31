import { ICoin } from "../config/global";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../libs/service/api";
import { convertTimestamp } from "../libs/helper/date";

const Coins = () => {
  const { isLoading, data: coins } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // 현재 날짜, 시각 가져오기
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const realTime = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(realTime);
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>Coins Rank</Title>
          <NowIs>{convertTimestamp(currentTime)}</NowIs>
        </Header>
        <Section>
          {isLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            <CoinsList>
            {coins?.slice(0, 100).map(coin => (
              <Coin key={coin.id}>
                {/* <CoinRank>{coin.rank}</CoinRank> */}
                <Link to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}>
                  <CoinImg src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>)}
        </Section>
      </Container>
    </>
  );
};

export default Coins;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  font-weight: 700;
`;

const NowIs = styled.div`
  margin-top: 20px;
`

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 24px;
`;

const Section = styled.section``;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 10px;
  display: block;
  align-items: center;
  a {
    padding: 20px;
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`