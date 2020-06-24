import { IProduct } from './../../products/product.model';
import { CartService } from './../../cart/cart.service';
import { MenuModalComponent } from './../../cart/menu-modal/menu-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  cartItems: IProduct[] = [];
  constructor(public dialog: MatDialog, public cartSvc: CartService) {}

  ngOnInit() {
    this.cartSvc.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  openCartModal() {
    const dialogRef = this.dialog.open(MenuModalComponent, {
      width: '500px',
      height: '500px'
    });
  }
}
