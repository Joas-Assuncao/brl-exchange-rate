import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExchangeRate } from '../models/Exchange.models';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  /* poderia estar no environments mas nao achei necessário por se tratar de um projeto simples */
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  }

  listExchange({
    from_symbol,
    to_symbol,
    path,
  }: {
    from_symbol: string;
    to_symbol: string;
    path: string;
  }): Observable<ExchangeRate> {
    const params: HttpParams = new HttpParams()
      .append(from_symbol, 'from_symbol')
      .append(to_symbol, 'to_symbol');

    if (path.includes('current')) {
      return of({
        exchangeRate: 5.03,
        fromSymbol: 'BRL',
        lastUpdatedAt: '2023-09-30T03:10:26.242Z',
        rateLimitExceeded: true,
        success: true,
        toSymbol: 'USD',
      });
    }

    return of({
      data: [
        {
          close: 5.0038,
          date: '2023-09-30T03:10:26.275Z',
          high: 5.0689,
          low: 4.9836,
          open: 5.0666,
        },
      ],
      from: 'BRL',
      lastUpdatedAt: '2023-09-30T03:10:26.275Z',
      rateLimitExceeded: true,
      success: true,
      to: 'USD',
    });

    // return this.http.get<ExchangeRate>(`${this.baseURL}${path}`, {
    //   params: params,
    // });
  }
}
