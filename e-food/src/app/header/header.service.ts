import { Observable, of } from 'rxjs';
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

export interface ICartItemCountResponse {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class HeaderService {

  constructor(private httpClient: HttpClient) {}

  getMenuItems(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/categories');
  }

  getCartItemCount(): Observable<ICartItemCountResponse> {
    return this.httpClient.get<ICartItemCountResponse>('/cartItemCount');
  }
}
