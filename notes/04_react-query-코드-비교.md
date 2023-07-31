# 1. react-query를 사용할 때와 그렇지 않을 때 코드 비교
## react-query 없이 fetch 함수로 불러오는 경우
- state로 `Loading` 여부를 따로 관리해주어야 하고,
- `useEffect` 훅 내부에 `async/await` 사용해서 불러와야 해서 코드가 길어짐
```tsx
// Coins.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../libs/service/api";
import { convertTimestamp } from "../libs/helper/date";

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Coins = () => {
  // 1. react-query 없이 coin api를 fetch온 코드
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      // console.log("coin json => ", json); // 코인이 60000개나 있다고..?
      setCoins(json.slice(0, 100));
      setIsLoading(false);
    })();
  }, [])
  // ... 이하 생략
```

<br />

## react-query 사용 시
- `useQuery` 훅으로 간편하게 코드를 작성할 수 있다.
- `state`로 따로 Loading 여부 관리해줄 필요 없이 useQuery 훅의 기능에 내장되어 있어서 간편
```tsx
// Coins.tsx
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../libs/service/api";
import { convertTimestamp } from "../libs/helper/date";

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Coins = () => {
  // 2. react-query 사용
  const { isLoading, data: coins } = useQuery<ICoin[]>("allCoins", fetchCoins);
```
```tsx
// api.ts
export const fetchCoins = async () => {
  return fetch("https://api.coinpaprika.com/v1/coins").then((res) => res.json());
};
```

<br />

# 2. 리액트 쿼리 Recap
## 1) react query의 fetcher function
- react query는 기본적으로 `fetcher 함수`를 만들 수 있도록 해줌
- fetcher 함수와 연결시켜서 `isLoading` 같은 함수가 call 되었는지 알 수 있음
- `isLoaidng` 함수가 끝나면 결과값(`data`)를 넣어주어 받아온 데이터를 쉽게 꺼내쓸 수 있음

<br />

## 2) Caching
- 고유한 `쿼리 키` 값을 설정해서 `useQuery` 훅의 매개변수로 넘겨주어, 캐시 데이터가 있으면 유저에게 Loading을 다시 보여주지 않을 수 있음 (UX 측면)

<br />

## 3) Dev Tools
- 캐시에 어떤 query가 있는지, 결과 data가 무엇인지, Data Explorer 등 다양한 기능을 제공

<br />

## 4) Query Key
- 쿼리 키는 캐시 시스템에서 저장되고 작동하기 위해 사용하는 값으로, 고유한 값이어야 한다.

```tsx
// Coin.tsx
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(`${coinId}`));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(`${coinId}`));
```

- 위의 `Coin.tsx` 코드를 보면, infoData와 tickersData의 query key를 고유하게 설정해주기 위해서 각각 `["info", coinId]`와 `["tickers", coinId]`로 설정해주었음
- 그냥 `[coinId]`로 설정해주면 고유한 값이 되지 않기 때문에, 앞에 일종의 category처럼 "info", "tickers"를 넣어주어 고유한 값으로 만들어준 것