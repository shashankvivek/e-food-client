import { IProduct } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { of, Observable } from 'rxjs';


@Injectable()
export class ProductsService {
  constructor(public http: HttpClient) {}

  getProductsByGroupId(grpId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://127.0.0.1:8080/productListBySubCategory/${grpId}`);
  }
}
