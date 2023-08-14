import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../libs/service/api";
import { convertTimestamp } from "../libs/helper/date";
import { Helmet } from "react-helmet";

import { ICoin } from "../config/global";
import * as S from "../styles/Coins.style";

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
      <S.Container>
        <Helmet>
          <title>Coins Ranking | Crypto Tracker</title>
        </Helmet>
        <S.Header>
          <S.Title>Crypto Tracker</S.Title>
          <S.NowIs>{convertTimestamp(currentTime)}</S.NowIs>
        </S.Header>
        <S.Section>
          {isLoading ? (
            <S.Loader>Loading...</S.Loader>
          ) : (
            <S.CoinsList>
            {coins?.slice(0, 100).map(coin => (
              <S.Coin key={coin.id}>
                {/* <CoinRank>{coin.rank}</CoinRank> */}
                <Link to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}>
                  <S.CoinImg src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  {coin.name} &rarr;
                </Link>
              </S.Coin>
            ))}
          </S.CoinsList>)}
        </S.Section>
      </S.Container>
    </>
  );
};

export default Coins;