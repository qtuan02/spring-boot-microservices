import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LayoutContent } from '~/shared/directives/layout-content';
import { injectProductByCode } from '../services/product';
import { getCodeFromSlugFn } from '~/shared/utils/slug';
import { MatIcon } from '@angular/material/icon';
import { QuantitySelector } from '~/shared/components/quantity-selector/quantity-selector';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { CartStore } from '~/core/stores/cart-store';

@Component({
  selector: 'app-product',
  imports: [LayoutContent, MatIcon, QuantitySelector, MatAnchor, MatIconButton],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);

  cartStore = inject(CartStore);

  getCodeFromSlugFn = getCodeFromSlugFn;

  quantity = signal(1);

  productCode = toSignal(
    this.route.params.pipe(map((params) => getCodeFromSlugFn(params['productCode']))),
    { initialValue: '' },
  );

  productResource = injectProductByCode(this.productCode);

  handleAddToCart() {
    const product = this.productResource?.data();
    if (!product) return;

    this.cartStore.addToCart(product, this.quantity());
  }
}
