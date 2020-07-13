import { ProductListComponent } from './product-list/product-list.component';
import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: ':id',
    component: ProductListComponent,
  },
  { path: '**', redirectTo: '/home' },
];
