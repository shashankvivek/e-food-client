import { HttpClient } from '@angular/common/http';
import { IProduct } from './../products/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartService {

  constructor(public http: HttpClient) { }

  getCheckoutCartItems(): Observable<any> {
    return this.http.get<any>('/v1/checkoutCart');
  }

}
