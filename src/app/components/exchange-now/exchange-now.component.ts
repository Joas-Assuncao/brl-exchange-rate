import { Component, Input } from '@angular/core';
import { ExchangeRateNow } from 'src/app/models/Exchange.models';

@Component({
  selector: 'app-exchange-now',
  templateUrl: './exchange-now.component.html',
  styleUrls: ['./exchange-now.component.scss'],
})
export class ExchangeNowComponent {
  @Input() currentExchange!: ExchangeRateNow;

  public formatCurrency(value?: number): string {
    if (!value) return 'R$ 0,00';

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    // Remove o espaço em branco após o símbolo da moeda
    return formatter.format(value).replace(/\s/g, '');
  }
}
