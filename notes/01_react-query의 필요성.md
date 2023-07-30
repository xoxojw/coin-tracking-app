- Home(Coins.tsx)를 통해서 사이트에 접속한 뒤 코인명을 클릭하는 방법이 아닌,
`localhost:3000/btc-bitcoin`과 같이 coin id를 바로 url로 입력해서 접속하면
Coins.tsx의 state에 api에서 받아온 데이터가 존재하지 않으므로, 코인 이름이 정상적으로 렌더링되지 않는다.
```tsx
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  // interface 또는 const { coinId } = useParams<{ coinId: string; }>();
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
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
            null
          )
          }
        </Section>
      </Container>
    </>
  );
};

export default Coin;

// styled-components ...
```