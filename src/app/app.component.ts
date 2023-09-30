import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ExchangeService } from './exchange.service';
import { DailyExchangeRate, ExchangeRate } from './models/Exchange.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  exchangeList: DailyExchangeRate[];
  currentExchange!: ExchangeRate;

  constructor(
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      inputSearch: [
        '',
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
      ],
    });

    this.exchangeList = [];
  }

  handleSearch() {
    console.log(this.form.value['inputSearch']);
    return;

    forkJoin([
      this.exchangeService.listExchange({
        from_symbol: 'BRL',
        to_symbol: this.form.value['inputSearch'],
        path: '/currentExchangeRate',
      }),

      this.exchangeService.listExchange({
        from_symbol: 'BRL',
        to_symbol: this.form.value['inputSearch'],
        path: '/dailyExchangeRate',
      }),
    ]).subscribe(([current, daily]) => {
      this.exchangeList = daily && daily?.data;
      this.currentExchange = current;
    });
  }
}
