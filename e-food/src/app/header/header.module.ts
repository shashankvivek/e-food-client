import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';
import { HttpClientModule } from '@angular/common/http';
import { CartPreviewComponent } from './cart-preview/cart-preview.component';



@NgModule({
  declarations: [NavBarComponent, CartPreviewComponent],
  imports: [
    CommonModule,
    SharedKernelModule,
    RouterModule
  ],
  entryComponents: [CartPreviewComponent],
  exports: [NavBarComponent]
})
export class HeaderModule { }
