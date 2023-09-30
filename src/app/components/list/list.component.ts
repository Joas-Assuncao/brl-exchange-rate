import { Component, Input } from '@angular/core';
import {
  DailyExchangeRate,
  ExchangeRate,
} from 'src/app/models/Exchange.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() currentExchange: ExchangeRate | undefined;
  @Input() exchangeList: DailyExchangeRate[] | undefined;

  isShowList: boolean;

  constructor() {
    this.isShowList = false;
  }

  showList(): void {
    this.isShowList = !this.isShowList;
  }
}
