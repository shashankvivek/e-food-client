import { ICartItem } from './../shared-kernel/shared.model';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './../products/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CartService {

  constructor(public http: HttpClient) { }

  getCheckoutCartItems(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>('/v1/checkoutCart');
  }

}
