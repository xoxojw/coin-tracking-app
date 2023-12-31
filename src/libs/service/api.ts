const BASE_URL = `https://api.coinpaprika.com/v1`
const SUB_URL = `https://ohlcv-api.nomadcoders.workers.dev?coinId`

export const fetchCoins = async () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const fetchCoinInfo = async (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const fetchCoinTickers = async (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export const fetchCoinHistory = async (coinId: string) => {
  return fetch(`${SUB_URL}=${coinId}`).then((res) => res.json());
}