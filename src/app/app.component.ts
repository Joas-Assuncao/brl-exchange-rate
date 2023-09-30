import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeService } from './exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formGroup: FormGroup;

  constructor(
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      inputSearch: [
        '',
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
      ],
    });
  }

  handleSearch() {
    this.exchangeService;
  }
}
