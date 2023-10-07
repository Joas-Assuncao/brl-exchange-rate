import { Component, Input } from '@angular/core';
import {
  ExchangeRateDaily,
  ExchangeRateNow,
} from 'src/app/models/Exchange.models';
import { ExchangeService } from 'src/app/services/exchange.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() currentExchange!: ExchangeRateNow;
  @Input() listDailyExchange!: ExchangeRateDaily[];
  @Input() formValue!: { currencyCode: string };

  isShowList: boolean;
  isLoading!: boolean;

  constructor(
    private exchangeService: ExchangeService,
    private snackBarService: SnackBarService
  ) {
    this.isShowList = false;
  }

  handleShowLast30DaysExchange() {
    this.isShowList = !this.isShowList;
    this.listDailyExchange = [];

    if (this.isShowList && !this.listDailyExchange[0]) {
      this.isLoading = true;

      const { currencyCode } = this.formValue;

      this.exchangeService
        .listExchangeLast30Days({
          to_symbol: 'BRL',
          from_symbol: currencyCode.toUpperCase(),
        })
        .subscribe({
          next: (daily) => {
            const thirtyDaysLater = new Date();
            thirtyDaysLater.setDate(thirtyDaysLater.getDate() - 30);

            const dailyExchangeRateFiltered = daily.filter(
              (dailyExchangeDailyItem) => {
                const dateCurrency = new Date(dailyExchangeDailyItem.date);

                return dateCurrency >= thirtyDaysLater;
              }
            );

            console.log(dailyExchangeRateFiltered);

            this.listDailyExchange = dailyExchangeRateFiltered;

            this.isLoading = false;
          },
          error: (error) => {
            this.snackBarService.openSnackBar(
              'Error fetching daily exchange rate'
            );

            this.isLoading = false;
          },
        });

      return;
    }
  }
}
