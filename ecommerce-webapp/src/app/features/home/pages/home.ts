import { Component, computed, inject, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { injectProductList } from '../services/product';
import { PageParams } from '~/shared/types/pagination';
import { Pagination } from '~/shared/components/pagination/pagination';
import { Sidebar } from '../components/sidebar/sidebar';
import { LayoutContent } from '~/shared/directives/layout-content';
import { ProductCard } from '~/shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [ProductCard, Pagination, Sidebar, LayoutContent],
  templateUrl: './home.html',
})
export class Home {
  protected readonly Array = Array;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  pagination = signal<PageParams>({ page: 1, size: 10 });

  categoryCode = toSignal(
    this.route.queryParams.pipe(map((params) => (params['category'] as string) || null)),
    { initialValue: null },
  );

  params = computed<PageParams>(() => ({
    ...this.pagination(),
    category: this.categoryCode() ?? undefined,
  }));

  productResource = injectProductList(this.params);

  handlePageEvent(e: PageEvent) {
    this.pagination.set({
      page: e.pageIndex + 1,
      size: e.pageSize,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleCategoryChange(categoryCode: string | null) {
    this.pagination.set({ page: 1, size: this.pagination().size });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryCode || null },
      queryParamsHandling: 'merge',
    });
  }
}
