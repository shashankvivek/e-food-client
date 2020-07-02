import { ISuccessResponse } from './../shared-kernel/shared.model';
import { switchMap } from 'rxjs/operators';
import { IProduct, IAddedToCartEvent } from './../products/product.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SubCategory {
  scId: string;
  scIsActive: boolean;
  scName: string;
}

export interface Category {
  bcId: string;
  bcIsActive: boolean;
  bcName: string;
  subCategories: SubCategory[];
}

export interface ICartItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private cartItems$ = new BehaviorSubject<ICartItem[]>([]);
  private cartItems: ICartItem[] = [];

  constructor(private httpClient: HttpClient) {}

  getMenuItems(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/categories');
  }

  getCartPreview() {
    return this.httpClient.get<ICartItem[]>('/cart').pipe(
      switchMap(items => {
        this.cartItems = items;
        this.cartItems$.next(this.cartItems);
        return this.cartItems$.asObservable();
      })
    );
  }

  getCartItemEvent() {
    return this.cartItems$.asObservable(); ;
  }

  updateCart(event: IAddedToCartEvent): void {
    const newItem: ICartItem = {
      productId: event.product.productId,
      productName: event.product.name,
      quantity: event.quantity,
      unitPrice: event.product.unitPrice,
      imageUrl: event.product.imageUrl
    };
    this.pushToCart(newItem);
  }

  private pushToCart(newItem: ICartItem) {
    this.cartItems.push(newItem);
    this.cartItems$.next(this.cartItems);
  }

  private removeFromCart(productId: number) {
    const index = this.cartItems.findIndex( item => item.productId === productId);
    if (index > -1 ) {
      this.cartItems.splice(index, 1);
    }
    this.cartItems$.next(this.cartItems);
  }

  addGuestSessionInfo(): Observable<any> {
    return this.httpClient.post('/sessionInfo', {
      extraInfo: ''
    });
  }

  removeItemFromCart(productId: number) {
    this.httpClient.delete<ISuccessResponse>('/cart?productId=' + productId).subscribe(response => {
      if (response.success) {
        this.removeFromCart(productId);
      }
    });
  }

}
