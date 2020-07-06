import { ISuccessResponse, ICartSuccessResponse } from './../shared-kernel/shared.model';
import {
  IProduct,
  IAddedToCartEvent,
  IAddToCartRequest
} from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AuthService } from '../shared-kernel/auth.service';

@Injectable()
export class ProductsService {
  constructor(public http: HttpClient, public authSvc: AuthService) {}

  getProductsByGroupId(grpId: number): Observable<IProduct[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };
    return this.http.get<IProduct[]>(
      `/v1/productListBySubCategory/${grpId}`,
      httpOptions
    );
  }

  addItemToCart(params: IAddedToCartEvent): Observable<ICartSuccessResponse> {
    const path = (this.authSvc.tokenPayLoad.isCustomer) ? 'user' : 'guest';
    const payload: IAddToCartRequest = {
      productId: params.product.productId,
      totalQty: params.quantity,
    };
    return this.http.post<ICartSuccessResponse>(`/v1/${path}/cart`, payload);
  }
}
