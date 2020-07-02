import { CartPreviewComponent } from './../cart-preview/cart-preview.component';
import { HeaderService, Category, ICartItem } from './../header.service';
import { IProduct } from './../../products/product.model';
import { CartService } from './../../cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  cartItemCount = 0;
  cartItems: ICartItem[] = [];
  menuItems: Category[] = [];
  constructor(
    public dialog: MatDialog,
    public cartSvc: CartService,
    public headerSvc: HeaderService
  ) {}

  ngOnInit() {
    this.headerSvc.getMenuItems().subscribe((items) => {
      this.menuItems = items;
    });
    // Unsubscribe
    this.headerSvc.getCartPreview().subscribe((cartItems) => {
      this.cartItemCount = cartItems.length;
      this.cartItems = cartItems;
    });
    this.headerSvc.addGuestSessionInfo().subscribe((res) => {
      console.log(res);
    });
  }

  openCartModal() {
    this.dialog.open(CartPreviewComponent, {
      width: '500px',
      height: '500px'
      // data:  this.cartItems
    });
  }
}
