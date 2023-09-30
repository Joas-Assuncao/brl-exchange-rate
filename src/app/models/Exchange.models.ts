export class DailyExchangeRate {
  close!: number;
  date!: string;
  high!: number;
  low!: number;
  open!: number;
}

export class ExchangeRate {
  exchangeRate!: number;
  fromSymbol!: string;
  lastUpdatedAt!: string;
  rateLimitExceeded!: boolean;
  success!: boolean;
  toSymbol!: string;

  data!: DailyExchangeRate[];
  from!: string;
  to!: string;
}
