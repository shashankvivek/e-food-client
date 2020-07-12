import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';



@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    SharedKernelModule
  ]
})
export class PaymentModule { }
