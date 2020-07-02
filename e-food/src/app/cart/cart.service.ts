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
    this.cartItems.push(item);
    this.cartItems$.next(this.cartItems);
  }



  getCartItemsAddedEvent(): Observable<IProduct[]> {
    return this.cartItems$.asObservable();
  }

}
