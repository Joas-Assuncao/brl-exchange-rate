import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ExchangeRate } from '../models/Exchange.models';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  /* poderia estar no environments mas nao achei necessário por se tratar de um projeto simples */
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://-brl-exchange.actionlabs.com.br/api/1.0/open';
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
      .append('apiKey', 'RVZG0GHEV2KORLNA')
      .append('from_symbol', from_symbol)
      .append('to_symbol', to_symbol);

    return this.http.get<ExchangeRate>(`${this.baseURL}${path}`, {
      params: params,
    });
  }
}
