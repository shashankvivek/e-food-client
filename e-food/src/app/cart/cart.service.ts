import { IBillableCart } from './cart.model';
import {
  ICartItem,
  ICartSuccessResponse,
  ISuccessResponse,
} from './../shared-kernel/shared.model';
import { HttpClient } from '@angular/common/http';
import { IProduct, IAddToCartRequest } from './../products/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CartService {
  constructor(public http: HttpClient) {}

  applyCouponToCart(id: string): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>(`/v1/coupon?couponCode=${id}`, {});
  }

  removeCouponFromCart(id: string): Observable<ISuccessResponse> {
    return this.http.delete<ISuccessResponse>(
      `/v1/coupon?couponCode=${id}`,
      {}
    );
  }
  getCheckoutCartItems(): Observable<IBillableCart> {
    return this.http.get<IBillableCart>('/v1/checkoutCart');
  }

  postProductQtyForUser(item: ICartItem): Observable<ICartSuccessResponse> {
    return this.http.post<ICartSuccessResponse>('/v1/user/cart', {
      totalQty: item.quantity,
      productId: item.productId,
    });
  }

  initPaymentProcess(amt: number, cur: string) {
    return this.http.post('/v1/initiatePayment', {
      amount: amt,
      currency : cur
    });
  }

  validatePayment(data) {
    return this.http.post('/v1/validatePayment', data);
  }

  get nativeWindow(): any {
    return _window();
  }
}

function _window(): any {
  return window;
}
