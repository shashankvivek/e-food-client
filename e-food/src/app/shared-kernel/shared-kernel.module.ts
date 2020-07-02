import { SharedService } from './shared.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatBadgeModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
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
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [SharedService],
})
export class SharedKernelModule {}
