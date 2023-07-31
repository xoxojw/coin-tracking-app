export interface RouteParams {
  coinId: string;
}
export interface RouteState {
  name: string;
}
export interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}
export interface IInfoData {
  name:               string;
  id:                 string;
  symbol:             string;
  rank:               number;
  is_new:             boolean;
  is_active:          boolean;
  type:               string;
  logo:               string;
  tags:               ITag[];
  team:               ITeam[];
  description:        string;
  message:            string;
  open_source:        boolean;
  started_at:         Date;
  development_status: string;
  hardware_wallet:    boolean;
  proof_type:         string;
  org_structure:      string;
  hash_algorithm:     string;
  links:              ILinks;
  links_extended:     ILinksExtended[];
  whitepaper:         IWhitepaper;
  first_data_at:      Date;
  last_data_at:       Date;
}
export interface ILinks {
  explorer:    string[];
  facebook:    string[];
  reddit:      string[];
  source_code: string[];
  website:     string[];
  youtube:     string[];
}
export interface ILinksExtended {
  url:    string;
  type:   string;
  stats?: IStats;
}
export interface IStats {
  subscribers?:  number;
  contributors?: number;
  stars?:        number;
  followers?:    number;
}
export interface ITag {
  id:           string;
  name:         string;
  coin_counter: number;
  ico_counter:  number;
}
export interface ITeam {
  id:       string;
  name:     string;
  position: string;
}
export interface IWhitepaper {
  link:      string;
  thumbnail: string;
}
export interface IPriceData {
  id:                 string;
  name:               string;
  symbol:             string;
  rank:               number;
  circulating_supply: number;
  total_supply:       number;
  max_supply:         number;
  beta_value:         number;
  first_data_at:      Date;
  last_updated:       Date;
  quotes:             IQuotes;
}
export interface IQuotes {
  USD: IUsd;
}
export interface IUsd {
  price:                  number;
  volume_24h:             number;
  volume_24h_change_24h:  number;
  market_cap:             number;
  market_cap_change_24h:  number;
  percent_change_15m:     number;
  percent_change_30m:     number;
  percent_change_1h:      number;
  percent_change_6h:      number;
  percent_change_12h:     number;
  percent_change_24h:     number;
  percent_change_7d:      number;
  percent_change_30d:     number;
  percent_change_1y:      number;
  ath_price:              number;
  ath_date:               Date;
  percent_from_price_ath: number;
}
