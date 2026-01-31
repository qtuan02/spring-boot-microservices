import { computed, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '~/core/services/api/category.service';

export function injectCategoryList() {
  const categoryService = inject(CategoryService);

  const resource = rxResource({
    stream: () => categoryService.getCategories(),
  });

  return {
    hasValue: computed(() => resource.hasValue()),
    isLoading: computed(() => resource.isLoading()),
    data: computed(() => {
      const rawData = resource.value()?.data ?? [];
      return [{ code: null, name: 'All' }, ...rawData];
    }),
  };
}
