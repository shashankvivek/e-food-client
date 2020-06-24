import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatMenuModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule],
})
export class SharedKernelModule {}
