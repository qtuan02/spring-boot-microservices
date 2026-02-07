import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-selector',
  imports: [MatIconButton, MatIcon],
  templateUrl: './quantity-selector.html',
  host: { class: '' },
})
export class QuantitySelector {
  minQuantity = input<number>(0);
  maxQuantity = input<number>(10);

  quantity = input<number>(1);
  quantityChange = output<number>();
}
