import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    SharedKernelModule,
    RouterModule
  ],
  exports: [NavBarComponent]
})
export class HeaderModule { }
