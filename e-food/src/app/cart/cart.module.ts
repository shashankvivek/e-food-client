import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartService } from './cart.service';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';

const routing: Routes = [{ path: '', component: CartComponent }];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routing),
    SharedKernelModule
  ],
  exports: [],
  providers: [
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class CartModule {}
