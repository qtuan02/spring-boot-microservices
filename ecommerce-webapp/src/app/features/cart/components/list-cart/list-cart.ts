import { Component, inject } from '@angular/core';
import { CartStore } from '~/core/stores/cart-store';
import { CartItem } from '../cart-item/cart-item';
import { LayoutCard } from '~/shared/directives/layout-card';

@Component({
  selector: 'app-list-cart',
  imports: [CartItem, LayoutCard],
  templateUrl: './list-cart.html',
})
export class ListCart {
  readonly cartStore = inject(CartStore);
}
