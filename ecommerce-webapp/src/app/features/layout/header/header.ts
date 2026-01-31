import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CART_PATHS, ROOT_PATHS } from '~/core/constants/path';
import { CartStore } from '~/core/stores/cart-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIconButton, MatIcon, MatBadge, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  readonly ROOT_PATHS = ROOT_PATHS;
  readonly CART_PATHS = CART_PATHS;
  readonly cartStore = inject(CartStore);
}
