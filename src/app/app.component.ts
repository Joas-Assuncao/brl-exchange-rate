import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ExchangeService } from './exchange.service';
import { DailyExchangeRate, ExchangeRate } from './models/Exchange.models';
import { calculateDiff } from './utils/calculateDiff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  exchangeList: DailyExchangeRate[] | undefined;
  currentExchange!: ExchangeRate;

  constructor(
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      inputSearch: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });

    this.exchangeList = [];

    calculateDiff(4.96, 5.03);
  }

  handleSearch() {
    const { inputSearch } = this.form.value;

    forkJoin([
      this.exchangeService.listExchange({
        from_symbol: 'BRL',
        to_symbol: inputSearch.toUpperCase(),
        path: '/currentExchangeRate',
      }),

      this.exchangeService.listExchange({
        from_symbol: 'BRL',
        to_symbol: inputSearch.toUpperCase(),
        path: '/dailyExchangeRate',
      }),
    ]).subscribe(([current, daily]) => {
      this.currentExchange = current;
      this.exchangeList = daily?.data;
    });
  }
}
