import { useQuery } from "react-query";
import { fetchCoinHistory } from "../libs/service/api";
import ApexChart from "react-apexcharts";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../recoil/atoms";

import { chartTimestamp } from "../libs/helper/date";
import { priceFormatter } from "../libs/helper/comma";

import * as S from "../styles/Chart.style";

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
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<IHistoryData[]>(
		["history", coinId],
		() => fetchCoinHistory(`${coinId}`),
		{
			refetchInterval: 10000,
		}
	);
	const exceptData = Array.isArray(data) ? data : [];
	const chartData = exceptData?.map((v) => {
		return {
			x: chartTimestamp(v.time_close),
			y: [v.open, v.high, v.low, v.close],
		};
	});
	console.log(chartData);
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<>
					<S.ChartTitle>Closing Price</S.ChartTitle>
					<ApexChart
						type="candlestick"
						series={[
              {
								data: chartData,
							},
						]}
						options={{
							theme: {
								mode: isDark ? "dark" : "light",
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
								axisBorder: { show: false },
								axisTicks: { show: false },
								labels: { show: false },
							},
              yaxis: {
								axisBorder: { show: false },
							},
							plotOptions: {
								candlestick: {
									colors: {
										upward: "#38c176",
										downward: "#df5d46",
									},
								},
							},
						}}
					/>
				</>
			)}
		</div>
	);
};

export default Chart;
