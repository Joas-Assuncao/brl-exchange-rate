import { Component, Input } from '@angular/core';
import { DailyExchangeRate } from 'src/app/models/Exchange.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() exchangeList: DailyExchangeRate[] | undefined;

  constructor() {
    this.exchangeList = [];
  }
}
