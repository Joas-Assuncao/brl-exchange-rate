import { Component, Input } from '@angular/core';
import { ExchangeRateDaily } from 'src/app/models/Exchange.models';
import { calculateDiff } from 'src/app/utils/calculateDiff';

@Component({
  selector: 'app-exchange-lasts',
  templateUrl: './exchange-lasts.component.html',
  styleUrls: ['./exchange-lasts.component.scss'],
})
export class ExchangeLastsComponent {
  @Input() listDailyExchange!: ExchangeRateDaily[];

  public calculateDiff = calculateDiff;
}
