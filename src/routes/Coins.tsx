import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      // console.log("coin json => ", json); // 코인이 60000개나 있다고..?
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, [])
  return (
    <>
      <Container>
        <Header>
          <Title>Coins Rank</Title>
        </Header>
        <Section>
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            <CoinsList>
            {coins.map(coin => (
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