import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  ExchangeRateData,
  ExchangeRateDaily,
  ExchangeRateNow,
} from '../models/Exchange.models';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  /* poderia estar no environments mas nao achei necessário por se tratar de um projeto simples */
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  }

  setHeaders({
    from_symbol,
    to_symbol,
  }: {
    from_symbol: string;
    to_symbol: string;
  }): HttpParams {
    return new HttpParams()
      .append('apiKey', 'RVZG0GHEV2KORLNA')
      .append('from_symbol', from_symbol)
      .append('to_symbol', to_symbol);
  }

  listExchangeNow({
    from_symbol,
    to_symbol,
  }: {
    from_symbol: string;
    to_symbol: string;
  }): Observable<ExchangeRateNow> {
    const params = this.setHeaders({
      from_symbol,
      to_symbol,
    });

    return this.http.get<ExchangeRateNow>(
      `${this.baseURL}/currentExchangeRate`,
      {
        params: params,
      }
    );
  }

  listExchangeLast30Days({
    from_symbol,
    to_symbol,
  }: {
    from_symbol: string;
    to_symbol: string;
  }): Observable<ExchangeRateDaily[]> {
    const params = this.setHeaders({
      from_symbol,
      to_symbol,
    });

    return this.http
      .get<ExchangeRateData>(`${this.baseURL}/dailyExchangeRate`, {
        params: params,
      })
      .pipe(map((result) => result.data));
  }
}
