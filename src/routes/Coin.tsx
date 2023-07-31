import { useEffect, useState } from "react";
import { Link, Switch, Route, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface IInfoData {
  name:               string;
  id:                 string;
  symbol:             string;
  rank:               number;
  is_new:             boolean;
  is_active:          boolean;
  type:               string;
  logo:               string;
  tags:               ITag[];
  team:               ITeam[];
  description:        string;
  message:            string;
  open_source:        boolean;
  started_at:         Date;
  development_status: string;
  hardware_wallet:    boolean;
  proof_type:         string;
  org_structure:      string;
  hash_algorithm:     string;
  links:              ILinks;
  links_extended:     ILinksExtended[];
  whitepaper:         IWhitepaper;
  first_data_at:      Date;
  last_data_at:       Date;
}
interface ILinks {
  explorer:    string[];
  facebook:    string[];
  reddit:      string[];
  source_code: string[];
  website:     string[];
  youtube:     string[];
}
interface ILinksExtended {
  url:    string;
  type:   string;
  stats?: IStats;
}
interface IStats {
  subscribers?:  number;
  contributors?: number;
  stars?:        number;
  followers?:    number;
}
interface ITag {
  id:           string;
  name:         string;
  coin_counter: number;
  ico_counter:  number;
}
interface ITeam {
  id:       string;
  name:     string;
  position: string;
}
interface IWhitepaper {
  link:      string;
  thumbnail: string;
}
interface IPriceData {
  id:                 string;
  name:               string;
  symbol:             string;
  rank:               number;
  circulating_supply: number;
  total_supply:       number;
  max_supply:         number;
  beta_value:         number;
  first_data_at:      Date;
  last_updated:       Date;
  quotes:             IQuotes;
}
interface IQuotes {
  USD: IUsd;
}
interface IUsd {
  price:                  number;
  volume_24h:             number;
  volume_24h_change_24h:  number;
  market_cap:             number;
  market_cap_change_24h:  number;
  percent_change_15m:     number;
  percent_change_30m:     number;
  percent_change_1h:      number;
  percent_change_6h:      number;
  percent_change_12h:     number;
  percent_change_24h:     number;
  percent_change_7d:      number;
  percent_change_30d:     number;
  percent_change_1y:      number;
  ath_price:              number;
  ath_date:               Date;
  percent_from_price_ath: number;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  // interface 또는 const { coinId } = useParams<{ coinId: string; }>();
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      console.log(infoData);
      setPriceInfo(priceData);
      console.log(priceData);
      setLoading(false);
    })()
  }, [coinId])

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
            <>
              <Overview>
                <OverviewItem>
                  <span>Rank</span>
                  <span>{info?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Symbol</span>
                  <span>${info?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Open Source</span>
                  <span>{info?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
              </Overview>
              <Description>{info?.description}</Description>
              <Overview>
                <OverviewItem>
                  <span>Total Suply</span>
                  <span>{priceInfo?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Max Supply</span>
                  <span>{priceInfo?.max_supply}</span>
                </OverviewItem>
              </Overview>

              <Tabs>
                <Tab isActive={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                  <Link to={`/${coinId}/price`}>Price</Link>  
                </Tab>  
              </Tabs>

              <Switch>
                <Route path={`/:coinId/price`}>
                  <Price />
                </Route>
                <Route path={`/:coinId/chart`}>
                  <Chart />
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
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 0px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  &:hover {
    transform: scale(1.03);
  }
  a {
    display: block;
  }
`;