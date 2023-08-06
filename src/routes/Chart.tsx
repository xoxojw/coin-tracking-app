import { useQuery } from "react-query";
import { fetchCoinHistory } from "../libs/service/api";
import ApexChart from "react-apexcharts";
import { styled } from "styled-components";
import { thousandsCommaFormatter } from "../libs/helper/comma";

interface ChartProps {
  coinId: string;
}

interface IHistoryData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  // console.log(coinId);
  const { isLoading, data } = useQuery<IHistoryData[]>(
    ["history", coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      refetchInterval: 10000,
    }
  )
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ChartTitle>Closing Price</ChartTitle>
          <ApexChart
            type="line"
            series={[
              {
                name: "price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 500,
                width: 500,
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              stroke: {
                width: 4,
              },
              xaxis: {
                type: "category",
                categories: data?.map((date) => {
                  const time = new Date(date.time_close * 1000)
                  const day = time.getDate().toString();
                  const month = (time.getMonth() + 1).toString();
                  return `${month}/${day}`;
                }),
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
              },
              yaxis: {
                axisBorder: { show: false },
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#60c4c9"],
                }
              },
              colors: ["#9c88ff"],
              tooltip: {
                y: {
                  formatter: (value) => {
                    return thousandsCommaFormatter(value);
                  }
                }
              }
            }}
          />    
        </>
      )}
    </div>
  );
};

export default Chart;

const ChartTitle = styled.h3`
  padding: 10px;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.accentColor2};
`