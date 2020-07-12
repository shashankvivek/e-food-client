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
  getCheckoutCartItems(): Observable<any> {
     return this.http.get<ICartItem[]>('/v1/checkoutCart');
    // return of({
    //   totalSaving: 51,
    //   totalPrice: 279,
    //   currency: 'Rs',
    //   offerItems: [
    //     {
    //       ruleSetId: 1,
    //       items: [
    //         {
    //           imageUrl:
    //             'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/apple-1.png',
    //           productId: 1,
    //           productName: 'Red Apple',
    //           quantity: 9,
    //           unitPrice: 10,
    //           totalPrice: 90,
    //         },
    //       ],
    //       actualPrice: 90.0,
    //       discountPercent: 10,
    //       discountedPrice: 81.0,
    //     },
    //     {
    //       ruleSetId: 2,
    //       items: [
    //         {
    //           imageUrl:
    //             'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/banana.jpg',
    //           productId: 3,
    //           productName: 'Banana',
    //           quantity: 2,
    //           unitPrice: 10,
    //           totalPrice: 20,
    //         },
    //         {
    //           imageUrl:
    //             'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/pears.jpg',
    //           productId: 5,
    //           productName: 'Pear',
    //           quantity: 4,
    //           unitPrice: 30,
    //           totalPrice: 120,
    //         },
    //       ],
    //       actualPrice: 140.0,
    //       discountPercent: 30,
    //       discountedPrice: 98.0,
    //     },
    //     {
    //       ruleSetId: 2,
    //       items: [
    //         {
    //           imageUrl:
    //             'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/banana.jpg',
    //           productId: 3,
    //           productName: 'Banana',
    //           quantity: 2,
    //           unitPrice: 10,
    //           totalPrice: 20,
    //         },
    //         {
    //           imageUrl:
    //             'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/pears.jpg',
    //           productId: 5,
    //           productName: 'Pear',
    //           quantity: 4,
    //           unitPrice: 30,
    //           totalPrice: 120,
    //         },
    //       ],
    //       actualPrice: 140.0,
    //       discountPercent: 30,
    //       discountedPrice: 98.0,
    //     },
    //   ],
    //   items: [
    //     {
    //       imageUrl:
    //         'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/oranges.jpg',
    //       productId: 4,
    //       productName: 'Oranges',
    //       quantity: 5,
    //       unitPrice: 20,
    //       totalPrice: 100,
    //     },
    //   ],
    // });
  }

  postProductQtyForUser(item: ICartItem): Observable<ICartSuccessResponse> {
    return this.http.post<ICartSuccessResponse>('/v1/user/cart', {
      totalQty: item.quantity,
      productId: item.productId,
    });
  }
}
