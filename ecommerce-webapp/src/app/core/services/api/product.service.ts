import { Injectable } from '@angular/core';
import { HttpContext, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { Product, ProductListResponse } from '~/shared/types/product';
import { PageParams } from '~/shared/types/pagination';
import { CACHING_ENABLED } from '~/core/interceptors/caching.interceptor';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  private readonly endpoint = '/catalog/api/products';

  getProducts(pageParams?: PageParams): Observable<ProductListResponse> {
    let params = new HttpParams();
    if (pageParams?.page) params = params.set('page', pageParams.page.toString());
    if (pageParams?.size) params = params.set('size', pageParams.size.toString());
    if (pageParams?.category) params = params.set('category', pageParams.category);

    return this.get<ProductListResponse>({
      path: this.endpoint,
      params,
      context: new HttpContext().set(CACHING_ENABLED, true),
    });
  }

  getProductByCode(code: string): Observable<Product> {
    return this.get<Product>({
      path: `${this.endpoint}/${code}`,
      context: new HttpContext().set(CACHING_ENABLED, true),
    });
  }

  //   createProduct(product: Omit<Product, 'code'>): Observable<Product> {
  //     return this.post<Product>(this.endpoint, product);
  //   }

  //   updateProduct(code: string, product: Partial<Product>): Observable<Product> {
  //     return this.put<Product>(`${this.endpoint}/${code}`, product);
  //   }

  //   deleteProduct(code: string): Observable<void> {
  //     return this.delete<void>(`${this.endpoint}/${code}`);
  //   }
}
