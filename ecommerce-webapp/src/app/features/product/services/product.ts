import { computed, inject, Signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '~/core/services/api/product.service';

export function injectProductByCode(productCode: Signal<string>) {
  const productService = inject(ProductService);

  const resource = rxResource({
    params: () => productCode(),
    stream: ({ params }) => productService.getProductByCode(params),
  });

  return {
    hasValue: computed(() => resource.hasValue()),
    isLoading: computed(() => resource.isLoading()),
    data: computed(() => resource.value() ?? null),
  };
}
