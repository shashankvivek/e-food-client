import { IProduct } from './../products/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: IProduct[] = [];

  cartItems$ = new BehaviorSubject<IProduct[]>([]);

  constructor() { }

  addProductToCart(item: IProduct) {
    // make a call to server and then get updated cart
    // consider price change in sync with Products
    this.cartItems.push(item);
    this.cartItems$.next(this.cartItems);
  }

  getCartItems(): Observable<IProduct[]> {
    return this.cartItems$.asObservable();
  }

}
