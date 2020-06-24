import { ProductsService } from './products.service';
import { productRoutes } from './products.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductGridComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedKernelModule,
    RouterModule.forChild(productRoutes)
  ],
  providers: [ProductsService]
})
export class ProductsModule {}
