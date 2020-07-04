import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';

import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: BannerComponent,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./../products/products.module').then((h) => h.ProductsModule),
      },
    ],
  },
];
