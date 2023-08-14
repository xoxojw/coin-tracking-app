import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  font-weight: 700;
`;

export const NowIs = styled.div`
  margin-top: 20px;
  color: ${props => props.theme.accentColor2};
`

export const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 24px;
`;

export const Section = styled.section``;

export const CoinsList = styled.ul``;

export const Coin = styled.li`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 10px;
  display: block;
  align-items: center;
  a {
    padding: 20px;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
      transform: scale(1.01);
    }
  }
`;

export const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`