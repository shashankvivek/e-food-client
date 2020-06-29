import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    SharedKernelModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [NavBarComponent]
})
export class HeaderModule { }
