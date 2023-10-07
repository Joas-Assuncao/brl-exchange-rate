export interface ExchangeRateNow {
  exchangeRate: number;
  fromSymbol: string;
  lastUpdatedAt: string;
  rateLimitExceeded: boolean;
  success: boolean;
  toSymbol: string;
}

export interface ExchangeRateDaily {
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
}

export interface ExchangeRateData {
  data: ExchangeRateDaily[];
  from: string;
  lastUpdatedAt: string; // Você pode querer usar um tipo Date em vez de string para representar datas
  rateLimitExceeded: boolean;
  success: boolean;
  to: string;
}
