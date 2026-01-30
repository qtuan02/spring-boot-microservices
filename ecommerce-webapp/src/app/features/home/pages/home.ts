import { Component, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { injectProductList } from '../services/product';
import { ProductCard } from '~/shared/components/product-card/product-card';
import { PageParams } from '~/shared/types/pagination';
import { Pagination } from '~/shared/components/pagination/pagination';
import { Product } from '~/shared/types/products';

@Component({
  selector: 'app-home',
  imports: [ProductCard, Pagination],
  templateUrl: './home.html',
})
export class Home {
  pagination = signal<PageParams>({ page: 1, size: 8 });

  productResource = injectProductList(this.pagination);

  handleAddToCart(product: Product) {
    console.log(product);
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.set({
      page: e.pageIndex + 1,
      size: e.pageSize,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
