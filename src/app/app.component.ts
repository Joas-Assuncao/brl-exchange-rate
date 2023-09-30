import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ExchangeService } from './services/exchange.service';
import { DailyExchangeRate, ExchangeRate } from './models/Exchange.models';
import { calculateDiff } from './utils/calculateDiff';
import { SnackBarService } from './services/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  exchangeList: DailyExchangeRate[] | undefined;
  currentExchange!: ExchangeRate;
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

    forkJoin([
      this.exchangeService.listExchange({
        to_symbol: 'BRL',
        from_symbol: inputSearch.toUpperCase(),
        path: '/currentExchangeRate',
      }),

      this.exchangeService.listExchange({
        to_symbol: 'BRL',
        from_symbol: inputSearch.toUpperCase(),
        path: '/dailyExchangeRate',
      }),
    ]).subscribe({
      next: ([current, daily]) => {
        this.currentExchange = current;
        this.exchangeList = daily?.data?.slice(0, 30);

        this.isLoading = false;
      },
      error: (err) => {
        this.snackBarService.openSnackBar(
          'Error fetching code! Try again or change the code'
        );

        this.isLoading = false;
      },
    });
  }
}
