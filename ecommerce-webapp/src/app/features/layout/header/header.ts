import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CART_PATHS, ROOT_PATHS, PROFILE_PATHS } from '~/core/constants/path';
import { CartStore } from '~/core/stores/cart-store';
import { AuthService } from '~/core/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '~/shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIconButton, MatIcon, MatBadge, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  ROOT_PATHS = ROOT_PATHS;
  CART_PATHS = CART_PATHS;
  PROFILE_PATHS = PROFILE_PATHS;
  cartStore = inject(CartStore);
  authService = inject(AuthService);
  private dialog = inject(MatDialog);

  logout() {
    const dialogRef = this.dialog.open<ConfirmDialog, ConfirmDialogData, boolean>(
      ConfirmDialog,
      {
        data: {
          title: 'Logout',
          message: 'Are you sure you want to logout?',
          confirmText: 'Logout',
          cancelText: 'Cancel',
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
      }
    });
  }
}
