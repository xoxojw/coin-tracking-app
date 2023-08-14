import { RouteParams, IInfoData, IPriceData } from "../config/global";
import { Link, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";

import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../libs/service/api";

import { thousandsCommaFormatter } from "../libs/helper/comma";

import { Helmet } from "react-helmet";

import * as S from "../styles/Coin.style";
import Loading from "../pages/Loading";

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(`${coinId}`));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(`${coinId}`));

  const price = tickersData?.quotes.USD.price || 0;

  const loading = infoLoading || tickersLoading;
  
  if (loading) <Loading />

  return (
    <>
      <S.Container>
        <Helmet>
          <title>{(infoData?.name || "Loading...") + ` | Crypto Tracker`}</title>
        </Helmet>
        <S.Header>
          <Link to={`/`}><S.BackToHomeIcon size={36} /></Link>
          <S.Title>{infoData?.name || "Loading..."}</S.Title>
          <S.EmptyDiv />
        </S.Header>
        <S.Section>
          <S.Overview>
            <S.OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Price</span>
              <span>{`$${thousandsCommaFormatter(price)}`}</span>
            </S.OverviewItem>
          </S.Overview>
          <S.Description>{infoData?.description}</S.Description>
          <S.Overview>
            <S.OverviewItem>
              <span>Total Supply</span>
              <span>{thousandsCommaFormatter(tickersData?.total_supply || 0)}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Max Supply</span>
              <span>{thousandsCommaFormatter(tickersData?.max_supply || 0)}</span>
            </S.OverviewItem>
          </S.Overview>

          <S.Tabs>
            <S.Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>
                  Chart
              </Link>
            </S.Tab>
            <S.Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>
                Price
              </Link>  
            </S.Tab>  
          </S.Tabs>

          <Switch>
            <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} />
            </Route> 
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route> 
          </Switch>
        </S.Section>
      </S.Container>
    </>
  );
};

export default Coin;