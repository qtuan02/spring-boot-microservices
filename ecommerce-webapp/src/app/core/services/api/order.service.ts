import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { CreateOrderRequest, CreateOrderResponse } from '~/shared/types/order';
import { ResponseSuccess } from '~/shared/types/response';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  private endpoint = '/order/api/orders';

  createOrder(order: CreateOrderRequest): Observable<ResponseSuccess<CreateOrderResponse>> {
    return this.post<ResponseSuccess<CreateOrderResponse>>(this.endpoint, order);
  }
}
