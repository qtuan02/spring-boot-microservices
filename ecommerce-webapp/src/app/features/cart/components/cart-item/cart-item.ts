import { Component, computed, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CartStore } from '~/core/stores/cart-store';
import { QuantitySelector } from '~/shared/components/quantity-selector/quantity-selector';
import { CartItem as CartItemType } from '~/shared/types/cart';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '~/shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cart-item',
  imports: [QuantitySelector, MatIconButton, MatIcon],
  templateUrl: './cart-item.html',
})
export class CartItem {
  private readonly dialog = inject(MatDialog);
  readonly cartStore = inject(CartStore);

  item = input.required<CartItemType>();

  total = computed(() => (this.item().quantity * this.item().product.price).toFixed(2));

  handleUpdateQuantity = (quantity: number) => {
    if (quantity <= 0) {
      this.confirmRemove();
      return;
    }
    this.cartStore.updateQuantityItem({ productCode: this.item().product.code, quantity });
  };

  confirmRemove() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {
        title: 'Are you sure you want to remove?',
        message: this.item().product.name,
        confirmText: 'Yes',
        cancelText: 'No',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.cartStore.removeFromCart(this.item().product.code);
      }
    });
  }
}
