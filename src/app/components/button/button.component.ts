import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled: boolean;
  @Output() eventSearch = new EventEmitter();

  constructor() {
    this.disabled = true;
  }

  handleSearch() {
    this.eventSearch.emit();
  }
}
