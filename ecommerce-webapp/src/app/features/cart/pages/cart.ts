import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CHECKOUT_PATHS } from '~/core/constants/path';
import { CartStore } from '~/core/stores/cart-store';
import { Navigate } from '~/shared/utils/navigate';
import { ListCart } from '../components/list-cart/list-cart';
import { LayoutContent } from '~/shared/directives/layout-content';
import { SummarizeOrder } from '../components/summarize-order/summarize-order';
import { BackButton } from '~/shared/components/back-button/back-button';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '~/shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cart',
  imports: [MatButton, ListCart, LayoutContent, SummarizeOrder, BackButton],
  templateUrl: './cart.html',
})
export class Cart {
  private navigate = inject(Navigate);
  private dialog = inject(MatDialog);

  cartStore = inject(CartStore);

  handleCheckout() {
    if (this.cartStore.count() === 0) {
      this.dialog.open(ConfirmDialog, {
        width: '350px',
        data: {
          title: 'Cart is empty',
          message: 'Please add items to your cart before proceeding to checkout.',
          confirmText: 'OK',
          hideCancelButton: true,
        } as ConfirmDialogData,
      });
      return;
    }
    this.navigate.redirect(CHECKOUT_PATHS.checkout);
  }
}
