import { useQuery } from "react-query";
import { IPriceData } from "../config/global";
import { fetchCoinTickers } from "../libs/service/api";
import { thousandsCommaFormatter } from "../libs/helper/comma";

import * as S from "../styles/Price.style";

interface PriceProps {
  coinId: string;
}

const Price = ({ coinId }: PriceProps) => {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(`${coinId}`)
  );

  const priceData = tickersData?.quotes.USD;

  return (
    <>
      {tickersLoading ? (
        "Loading Price..."
      ) : (
        <>
          <S.PriceTitle>Price Information</S.PriceTitle>
          <S.PriceTableWrapper>
            <S.TableContainer>
              <thead>
                <S.TableRow>
                  <S.TableHeader>Price</S.TableHeader>
                  <S.TableHeader>1h</S.TableHeader>
                  <S.TableHeader>24h</S.TableHeader>
                  <S.TableHeader>Week</S.TableHeader>
                  <S.TableHeader>Month</S.TableHeader>
                  <S.TableHeader>Year</S.TableHeader>
                </S.TableRow>
              </thead>
              <tbody>
                <S.TableRow>
                  <S.TableData>${thousandsCommaFormatter(priceData?.price || 0)}</S.TableData>
                  <S.TableData>{`${priceData?.percent_change_1h}%`}</S.TableData>
                  <S.TableData>{`${priceData?.percent_change_24h}%`}</S.TableData>
                  <S.TableData>{`${priceData?.percent_change_7d}%`}</S.TableData>
                  <S.TableData>{`${priceData?.percent_change_30d}%`}</S.TableData>
                  <S.TableData>{`${priceData?.percent_change_1y}%`}</S.TableData>
                </S.TableRow>
              </tbody>
              </S.TableContainer>
          </S.PriceTableWrapper>
        </>
      )}
    </>
  );
};

export default Price;
