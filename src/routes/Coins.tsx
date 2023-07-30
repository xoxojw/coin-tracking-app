import { Link } from "react-router-dom";
import styled from "styled-components";

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
]

const Coins = () => {
  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        <Section>
          <CoinsList>
            {coins.map(coin => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
              </Coin>
            ))}
          </CoinsList>
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
  a {
    padding: 20px;
    transition: color 0.2s ease-in-out;
    // display: block - 카드 전체를 클릭할 수 있도록
    display: block;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;
