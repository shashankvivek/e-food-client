import { ISuccessResponse } from './../shared-kernel/shared.model';
import {
  IProduct,
  IAddedToCartEvent,
  IAddToCartRequest
} from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(public http: HttpClient) {}

  getProductsByGroupId(grpId: number): Observable<IProduct[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };
    return this.http.get<IProduct[]>(
      `/productListBySubCategory/${grpId}`,
      httpOptions
    );
  }

  addItemToCart(params: IAddedToCartEvent): Observable<ISuccessResponse> {
    const payload: IAddToCartRequest = {
      productId: params.product.productId,
      totalQty: params.quantity,
    };
    return this.http.post<ISuccessResponse>('/cart', payload);
  }
}
