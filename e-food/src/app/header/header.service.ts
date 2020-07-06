import { UtilService } from 'src/app/shared-kernel/util.service';
import { ISuccessResponse } from './../shared-kernel/shared.model';
import { switchMap, map, tap } from 'rxjs/operators';
import { IProduct, IAddedToCartEvent } from './../products/product.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared-kernel/auth.service';

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
  currency: string;
}

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private cartItems$ = new BehaviorSubject<ICartItem[]>([]);
  private cartItems: ICartItem[] = [];

  constructor(
    private httpClient: HttpClient,
    public authSvc: AuthService,
    public utilSvc: UtilService
  ) {}

  getMenuItems(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/v1/categories');
  }

  getCartPreview() {
    const path = (this.authSvc.tokenPayLoad.isCustomer) ? 'user' : 'guest';
    return this.httpClient.get<ICartItem[]>(`/v1/${path}/cart`).pipe(
      switchMap((items) => {
        this.cartItems = items;
        this.cartItems$.next(this.cartItems);
        return this.cartItems$.asObservable();
      })
    );
  }

  getCartItemEvent() {
    return this.cartItems$.asObservable();
  }

  updateCart(event: IAddedToCartEvent): void {
    const newItem: ICartItem = {
      productId: event.product.productId,
      productName: event.product.name,
      quantity: event.quantity,
      unitPrice: event.product.unitPrice,
      imageUrl: event.product.imageUrl,
      currency: event.product.currency
    };
    this.pushToCart(newItem);
  }

  private pushToCart(newItem: ICartItem) {
    this.cartItems.push(newItem);
    this.cartItems$.next(this.cartItems);
  }

  private removeFromCart(productId: number) {
    const index = this.cartItems.findIndex(
      (item) => item.productId === productId
    );
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartItems$.next(this.cartItems);
  }

  addGuestSessionInfo(): void {
    this.httpClient
      .post('/v1/sessionInfo', {
        extraInfo: '',
      })
      .subscribe(
        (res) => {},
        (err) => {
          this.utilSvc.showSnackBar('Error with creating guest session');
        }
      );
  }

  removeItemFromCart(productId: number): Observable<ISuccessResponse> {
    const path = (this.authSvc.tokenPayLoad.isCustomer) ? 'user' : 'guest';
    return this.httpClient
      .delete<ISuccessResponse>(`/v1/${path}/cart?productId=${productId}`)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.removeFromCart(productId);
          }
        })
      );
  }
}
