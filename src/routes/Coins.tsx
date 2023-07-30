import styled from "styled-components";

const Coins = () => {
  return <Title>Coins</Title>;
};

export default Coins;

const Title = styled.h1`
  color: ${props => props.theme.accentColor}
`;
