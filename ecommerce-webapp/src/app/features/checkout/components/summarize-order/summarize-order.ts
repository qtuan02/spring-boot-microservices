import { Component, computed, inject } from '@angular/core';
import { CartStore } from '~/core/stores/cart-store';
import { LayoutCard } from '~/shared/directives/layout-card';

@Component({
  selector: 'app-summarize-order',
  imports: [LayoutCard],
  templateUrl: './summarize-order.html',
})
export class SummarizeOrder {
  readonly cartStore = inject(CartStore);

  subtotal = computed(() =>
    this.cartStore
      .items()
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2),
  );

  tax = computed(() => (parseFloat(this.subtotal()) * 0.05).toFixed(2));

  total = computed(() => (parseFloat(this.subtotal()) + parseFloat(this.tax())).toFixed(2));
}
