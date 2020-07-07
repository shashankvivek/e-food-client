import {
  ICartItem,
  ICartSuccessResponse,
} from './../shared-kernel/shared.model';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './../products/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CartService {
  constructor(public http: HttpClient) {}

  getCheckoutCartItems(): Observable<any> {
    // return this.http.get<ICartItem[]>('/v1/checkoutCart');
    return of([
      {
        ruleSetId: 1,
        currency: 'Rs',
        items: [
          {
            currency: 'Rs',
            imageUrl:
              'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/apple-1.png',
            productId: 1,
            productName: 'Red Apple',
            quantity: 3,
            unitPrice: 10,
            totalPrice: 30
          },
          {
            currency: 'Rs',
            imageUrl:
              'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/apple-3.jpg',
            productId: 2,
            productName: 'Gree Apple',
            quantity: 4,
            unitPrice: 15,
            totalPrice: 60
          },
        ],
        actualPrice: 90.0,
        discountPercent: 10,
        discountedPrice: 80.0,
      },
      {
        ruleSetId: 2,
        currency: 'Rs',
        items: [
          {
            currency: 'Rs',
            imageUrl:
              'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/banana.jpg',
            productId: 3,
            productName: 'Banana',
            quantity: 2,
            unitPrice: 10,
            totalPrice: 20
          },
          {
            currency: 'Rs',
            imageUrl: 'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/pears.jpg',
            productId: 5,
            productName: 'Pear',
            quantity: 4,
            unitPrice: 30,
            totalPrice: 120
          },
        ],
        actualPrice: 140.0,
        discountPercent: 30,
        discountedPrice: 98.0,
      },
      {
        currency: 'Rs',
        imageUrl:
          'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/oranges.jpg',
        productId: 4,
        productName: 'Oranges',
        quantity: 5,
        unitPrice: 20,
        totalPrice: 100
      },
    ]);
  }

  postProductQtyForUser(item: ICartItem): Observable<ICartSuccessResponse> {
    return this.http.post<ICartSuccessResponse>('/v1/user/cart', {
      totalQty: item.quantity,
      productId: item.productId,
    });
  }
}
