import { Component, Input } from '@angular/core';
import { DailyExchangeRate } from 'src/app/models/Exchange.models';
import { calculateDiff } from 'src/app/utils/calculateDiff';

@Component({
  selector: 'app-exchange-lasts',
  templateUrl: './exchange-lasts.component.html',
  styleUrls: ['./exchange-lasts.component.scss'],
})
export class ExchangeLastsComponent {
  @Input() exchangeList: DailyExchangeRate[] | undefined;
  @Input() currentValue: number;

  public calculateDiff = calculateDiff;

  constructor() {
    this.currentValue = 0;
  }
}
