import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ROOT_PATHS } from '~/core/constants/path';
import { Navigate } from '~/shared/utils/navigate';
import { ListCart } from '../components/list-cart/list-cart';
import { LayoutContent } from '~/shared/directives/layout-content';
import { SummarizeOrder } from '../components/summarize-order/summarize-order';

@Component({
  selector: 'app-cart',
  imports: [MatButton, ListCart, LayoutContent, SummarizeOrder],
  templateUrl: './cart.html',
})
export class Cart {
  private readonly navigate = inject(Navigate);

  handleBack() {
    this.navigate.redirect(ROOT_PATHS.home);
  }
}
