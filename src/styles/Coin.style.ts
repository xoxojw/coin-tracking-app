import ArrowLeftCircleLineIcon from "remixicon-react/ArrowLeftCircleLineIcon"
import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;
export const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 24px;
`;
export const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BackToHomeIcon = styled(ArrowLeftCircleLineIcon)`
  color: #9f9f9f;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`
export const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  font-weight: 700;
`;
export const EmptyDiv = styled.div``
export const Section = styled.section``;
export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.boxColor};
  padding: 20px 30px;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    color: ${props => props.theme.accentColor};
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
export const Description = styled.p`
  margin: 20px 0px;
  padding: 5px;
  text-align: justify;
  line-height: 1.2;
`;
export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
export const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: ${props => props.isActive ? 700 : 500};
  padding: 10px 0px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: 
  ${props => props.isActive ? props.theme.boxColor : props.theme.notActiveColor};
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  &:hover {
    transform: scale(1.03);
  }
  a {
    display: block;
  }
`;