import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CART_PATHS } from '~/core/constants/path';
import { CART_STORAGE_KEY } from '~/core/stores/cart-store';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '~/shared/components/confirm-dialog/confirm-dialog';

export const checkoutGuard: CanActivateFn = () => {
  const dialog = inject(MatDialog);
  const router = inject(Router);

  const raw = localStorage.getItem(CART_STORAGE_KEY);
  const cart = raw ? JSON.parse(raw) : null;
  const hasItems = cart?.items?.length > 0;

  if (!hasItems) {
    dialog.open(ConfirmDialog, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Cart is empty',
        message: 'Please add items to your cart before proceeding to checkout.',
        confirmText: 'OK',
        hideCancelButton: true,
      } as ConfirmDialogData,
    });

    router.navigate([CART_PATHS.cart]);
    return false;
  }

  return true;
};
