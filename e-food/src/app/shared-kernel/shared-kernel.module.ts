import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatBadgeModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatCardModule, MatIconModule,MatBadgeModule],
})
export class SharedKernelModule {}
