import { Component, Input } from '@angular/core';
import {
  ExchangeRateDaily,
  ExchangeRateNow,
} from 'src/app/models/Exchange.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() currentExchange!: ExchangeRateNow;
  @Input() listDailyExchange!: ExchangeRateDaily[];

  isShowList: boolean;

  constructor() {
    this.isShowList = false;
  }

  showList(): void {
    this.isShowList = !this.isShowList;
  }
}
