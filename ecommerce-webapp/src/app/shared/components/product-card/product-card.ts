import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '~/shared/types/product';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartStore } from '~/core/stores/cart-store';
import { PRODUCT_PATHS } from '~/core/constants/path';
import { generateSlugFn } from '~/shared/utils/slug';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon, RouterLink],
  templateUrl: './product-card.html',
  host: { class: '' },
})
export class ProductCard {
  private cartStore = inject(CartStore);

  PRODUCT_PATHS = PRODUCT_PATHS;
  generateSlugFn = generateSlugFn;

  product = input.required<Product>();

  handleAddToCart(event: Event) {
    event.stopPropagation();
    this.cartStore.addToCart(this.product());
  }
}
