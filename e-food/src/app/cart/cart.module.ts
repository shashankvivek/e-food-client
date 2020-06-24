import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModalComponent } from './menu-modal/menu-modal.component';



@NgModule({
  declarations: [MenuModalComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [MenuModalComponent],
  exports: [MenuModalComponent]
})
export class CartModule { }
