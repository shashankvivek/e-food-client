import { AuthGuard } from './../shared-kernel/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';

const routes: Routes = [
  { path: ':id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedKernelModule],
})
export class OrderModule {}
