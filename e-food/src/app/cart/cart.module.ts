import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { Routes, RouterModule } from '@angular/router';

const routing: Routes = [{ path: '', component: CartComponent }];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, RouterModule.forChild(routing)],
  exports: [],
})
export class CartModule {}
