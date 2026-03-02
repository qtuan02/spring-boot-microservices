import { inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { OrderService } from '~/core/services/api/order.service';
import { CartStore } from '~/core/stores/cart-store';
import { CreateOrderRequest, CreateOrderResponse } from '~/shared/types/order';

export function injectCreateOrder() {
  const orderService = inject(OrderService);
  const cartStore = inject(CartStore);

  const isLoading = signal(false);
  const orderNumber = signal<string | null>(null);
  const error = signal<string | null>(null);

  const createOrder = (order: CreateOrderRequest) => {
    if (isLoading()) return;

    isLoading.set(true);
    error.set(null);

    orderService
      .createOrder(order)
      .pipe(finalize(() => isLoading.set(false)))
      .subscribe({
        next: (res) => {
          orderNumber.set(res.data.orderNumber);
          cartStore.clearCart();
        },
        error: (err) => error.set(err),
      });
  };

  return {
    isLoading: isLoading,
    orderNumber: orderNumber,
    error: error,
    createOrder,
  };
}
