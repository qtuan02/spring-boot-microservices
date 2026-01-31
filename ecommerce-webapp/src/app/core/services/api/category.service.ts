import { Injectable } from '@angular/core';
import { HttpContext, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { CategoryListResponse } from '~/shared/types/category';
import { PageParams } from '~/shared/types/pagination';
import { CACHING_ENABLED } from '~/core/interceptors/caching.interceptor';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  private readonly endpoint = '/catalog/api/categories';

  getCategories(pageParams?: PageParams): Observable<CategoryListResponse> {
    let params = new HttpParams();
    if (pageParams?.page) params = params.set('page', pageParams.page.toString());
    if (pageParams?.size) params = params.set('size', pageParams.size.toString());

    return this.get<CategoryListResponse>({
      path: this.endpoint,
      params,
      context: new HttpContext().set(CACHING_ENABLED, true),
    });
  }
}
