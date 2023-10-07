import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './error-snack-bar.component.html',
  styleUrls: ['./error-snack-bar.component.scss'],
})
export class ErrorSnackBarComponent {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {
    this.message = data.message;
  }
}
