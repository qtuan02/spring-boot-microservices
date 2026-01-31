import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LayoutContent } from '~/shared/directives/layout-content';
import { injectProductByCode } from '../services/product';

@Component({
  selector: 'app-product',
  imports: [LayoutContent],
  templateUrl: './product.html',
})
export class Product {
  private readonly route = inject(ActivatedRoute);

  productCode = toSignal(this.route.params.pipe(map((params) => params['productCode'] as string)), {
    initialValue: '',
  });

  productResource = injectProductByCode(this.productCode);
}
