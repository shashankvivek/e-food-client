import { productRoutes } from './products.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductGridComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule,
    RouterModule.forChild(productRoutes)
  ],
})
export class ProductsModule {}
