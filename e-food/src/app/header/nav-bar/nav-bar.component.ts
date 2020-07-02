import { HeaderService, Category } from "./../header.service";
import { IProduct } from "./../../products/product.model";
import { CartService } from "./../../cart/cart.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  cartItemCount = 0;
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
    });
    this.headerSvc.addGuestSessionInfo().subscribe((res) => {
      console.log(res);
    });
  }

  openCartModal() {
    // const dialogRef = this.dialog.open(MenuModalComponent, {
    //   width: '500px',
    //   height: '500px',
    // });
  }
}
