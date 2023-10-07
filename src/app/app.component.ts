import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ExchangeRateDaily, ExchangeRateNow } from './models/Exchange.models';
import { ExchangeService } from './services/exchange.service';
import { SnackBarService } from './services/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  listDailyExchange!: ExchangeRateDaily[];
  currentExchange!: ExchangeRateNow;
  isLoading: boolean;

  constructor(
    private exchangeService: ExchangeService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      inputSearch: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });

    this.isLoading = false;
  }

  handleSearch() {
    const { inputSearch } = this.form.value;

    this.isLoading = true;

    this.exchangeService
      .listExchangeNow({
        to_symbol: 'BRL',
        from_symbol: inputSearch.toUpperCase(),
      })
      .subscribe({
        next: (current) => {
          this.currentExchange = current;

          this.isLoading = false;
        },
        error: (error) => {
          this.snackBarService.openSnackBar(
            'Error fetching current exchange rate'
          );

          this.isLoading = false;
        },
      });
  }

  handleShowLast30DaysExchange() {
    const { inputSearch } = this.form.value;

    this.isLoading = true;

    this.exchangeService
      .listExchangeLast30Days({
        to_symbol: 'BRL',
        from_symbol: inputSearch.toUpperCase(),
      })
      .subscribe({
        next: (daily) => {
          this.listDailyExchange = daily;
        },
        error: (error) => {
          this.snackBarService.openSnackBar(
            'Error fetching daily exchange rate'
          );

          this.isLoading = false;
        },
      });
  }
}
