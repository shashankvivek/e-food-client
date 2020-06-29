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

@Injectable({ providedIn: 'root' })
export class HeaderService {

  constructor(private httpClient: HttpClient) {}

  getMenuItems(): Observable<any> {
    return this.httpClient.get<Category[]>('http://127.0.0.1:8080/categories');
  }
}
