import { useQuery } from "react-query";
import { IPriceData } from "../config/global";
import { fetchCoinTickers } from "../libs/service/api";
import { thousandsCommaFormatter } from "../libs/helper/comma";
import styled from "styled-components";

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
          <PriceTitle>Price Information</PriceTitle>
          <PriceTableWrapper>
            <TableContainer>
              <thead>
                <TableRow>
                  <TableHeader>가격</TableHeader>
                  <TableHeader>1시간</TableHeader>
                  <TableHeader>24시간</TableHeader>
                  <TableHeader>주간</TableHeader>
                  <TableHeader>월간</TableHeader>
                  <TableHeader>연간</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableData>${thousandsCommaFormatter(priceData?.price || 0)}</TableData>
                  <TableData>{`${priceData?.percent_change_1h}%`}</TableData>
                  <TableData>{`${priceData?.percent_change_24h}%`}</TableData>
                  <TableData>{`${priceData?.percent_change_7d}%`}</TableData>
                  <TableData>{`${priceData?.percent_change_30d}%`}</TableData>
                  <TableData>{`${priceData?.percent_change_1y}%`}</TableData>
                </TableRow>
              </tbody>
              </TableContainer>
          </PriceTableWrapper>
        </>
      )}
    </>
  );
};

export default Price;

const PriceTitle = styled.h3`
  padding: 10px;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.accentColor2};
`;

const PriceTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const TableContainer = styled.div`
  width: 500px;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: center;
  font-weight: 700;
  color: ${props => props.theme.accentColor};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  border-top: 1px solid #868686;
  padding: 15px;
  text-align: center;
`;
