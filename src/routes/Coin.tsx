import { RouteParams, IInfoData, IPriceData } from "../config/global";
import { Link, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import ArrowLeftCircleLineIcon from "remixicon-react/ArrowLeftCircleLineIcon"

import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../libs/service/api";

import styled from "styled-components";
import { Helmet } from "react-helmet";

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(`${coinId}`));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(`${coinId}`));

  const price = tickersData?.quotes.USD.price;

  const formattedPrice = price?.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: price % 1 === 0 ? 0 : 3,
  });

  const loading = infoLoading || tickersLoading;
  return (
    <>
      <Container>
        <Helmet>
          <title>{(infoData?.name || "Loading...") + ` | Crypto Tracker`}</title>
        </Helmet>
        <Header>
          <Link to={`/`}><BackToHomeIcon size={36} /></Link>
          <Title>{infoData?.name || "Loading..."}</Title>
          <EmptyDiv />
        </Header>
        <Section>
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            <>
              <Overview>
                <OverviewItem>
                  <span>Rank</span>
                  <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Symbol</span>
                  <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Price</span>
                  <span>{`$${formattedPrice}`}</span>
                </OverviewItem>
              </Overview>
              <Description>{infoData?.description}</Description>
              <Overview>
                <OverviewItem>
                  <span>Total Suply</span>
                  <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Max Supply</span>
                  <span>{tickersData?.max_supply}</span>
                </OverviewItem>
              </Overview>

              <Tabs>
                <Tab isActive={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>
                      Chart
                  </Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                  <Link to={`/${coinId}/price`}>
                    Price
                  </Link>  
                </Tab>  
              </Tabs>

              <Switch>
                <Route path={`/:coinId/chart`}>
                    <Chart coinId={coinId} />
                </Route> 
                <Route path={`/:coinId/price`}>
                  <Price />
                </Route> 
              </Switch>  
            </>
          )}
        </Section>
      </Container>
    </>
  );
};

export default Coin;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 24px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackToHomeIcon = styled(ArrowLeftCircleLineIcon)`
  color: #9f9f9f;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  font-weight: 700;
`;

const EmptyDiv = styled.div``

const Section = styled.section``;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 30px;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const OverviewItem = styled.div`
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
`;
const Description = styled.p`
  margin: 20px 0px;
  padding: 5px;
  text-align: justify;
  line-height: 1.2;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: ${props => props.isActive ? 700 : 300};
  padding: 10px 0px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: 
  ${props => props.isActive ? "#0000007f;" : "#0000004f;"};
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  &:hover {
    transform: scale(1.03);
  }
  a {
    display: block;
  }
`;