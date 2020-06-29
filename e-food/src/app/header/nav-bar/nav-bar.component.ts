import { HeaderService, Category } from './../header.service';
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
  cartItems: IProduct[] = [];
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
    this.cartSvc.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  openCartModal() {
    // const dialogRef = this.dialog.open(MenuModalComponent, {
    //   width: '500px',
    //   height: '500px',
    // });
  }
}
