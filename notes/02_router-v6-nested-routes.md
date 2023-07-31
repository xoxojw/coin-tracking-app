# React-Router-DOM v6 이상에서 Nested Routes 작성 방법

> https://ui.dev/react-router-nested-routes/

v6에서 nested routes를 구현하는 방법은 두 가지가 있습니다.
## 첫 번째 방법
- 부모 route의 path 마지막에 /*를 적어 명시적으로 이 route의 내부에서 nested route가 render 될 수 있음을 표시하고, 자식 route를 부모 route의 element 내부에 작성하는 방법

```tsx
// Router.tsx
<Route path="/:coinId/*" element={<Coin/>} />
```
```tsx
// Coin.tsx
<Routes>
<Route path="chart" element={<Chart />} />
<Route path="price" element={<Price />} />
</ Routes>
```

- Routes가 상대경로도 지원하기 때문에 path="chart"와 같이 써도 동작한다고 하네요.

<br />

## 두 번째 방법
- 자식 route를 부모 element의 내부가 아닌 route 내부에 작성하는 방법입니다.

코드는 다음과 같이 작성합니다.

```tsx
// ...
import Price from "./Price";
import Chart from "./Chart";
// ...

<Route path="/:coinId" element={<Coin />} >
<Route path="chart" element={<Chart />} />
<Route path="price" element={<Price />} />
</Route>
```

- 그리고 이 자식 Route들이 어디에 render 될지 부모의 element안에 Outlet을 이용해 표시해주면 됨
- Coin.tsx에서, react-router-dom에서 Outlet을 import하고
Overview와 Container 사이에 `<Outlet />`를 작성해주면 끝납니다.