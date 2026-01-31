import { computed, inject, Signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '~/core/services/api/product.service';
import { PageParams } from '~/shared/types/pagination';

export function injectProductList(pagination: Signal<PageParams>) {
  const productService = inject(ProductService);

  const resource = rxResource({
    params: () => pagination(),
    stream: ({ params }) => productService.getProducts(params),
  });

  return {
    hasValue: computed(() => resource.hasValue()),
    isLoading: computed(() => resource.isLoading()),
    data: computed(() => resource.value()?.data ?? []),
    pageSize: computed(() => pagination().size ?? 12),
    pageIndex: computed(() => (pagination().page ?? 1) - 1),
    totalElements: computed(() => resource.value()?.totalElements ?? 0),
  };
}
