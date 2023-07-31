# useMatch()
## 이전 버전 `useRouteMatch()` &rarr; v6 `useMatch()`
> https://reactrouter.com/docs/en/v6/api#usematch
- 현재 위치를 기준으로 지정된 경로에 대한 일치 데이터를 반환
```tsx
const chartMatch: PathMatch< "coinId" > | null = useMatch("/:coinId/chart");
```

<br />

## matchPath()
> https://reactrouter.com/docs/en/v6/api#matchpath
- matchPath는 URL 경로 이름에 대해 경로 패턴을 일치시키고 일치에 대한 정보를 반환