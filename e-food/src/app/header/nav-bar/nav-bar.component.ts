import { SharedService } from './../../shared-kernel/shared.service';
import { CartPreviewComponent } from './../cart-preview/cart-preview.component';
import { HeaderService, Category, ICartItem } from './../header.service';
import { IProduct } from './../../products/product.model';
import { CartService } from './../../cart/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { forkJoin, combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartItems: ICartItem[] = [];
  menuItems: Category[] = [];
  SubscriptionGroup = new Subscription();

  constructor(
    public dialog: MatDialog,
    public cartSvc: CartService,
    public headerSvc: HeaderService,
    public sharedSvc: SharedService
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.SubscriptionGroup.add(combineLatest([
      this.headerSvc.getMenuItems(),
      this.headerSvc.getCartPreview(),
      this.headerSvc.addGuestSessionInfo(),

    ]).subscribe(responseArray => {
      console.log(responseArray);
      this.menuItems = responseArray[0];
      this.cartItems = responseArray[1];
    }, err => {
      this.sharedSvc.showSnackBar('Error loading contents');
    }));
  }

  openCartModal(): void {
    this.dialog.open(CartPreviewComponent, {
      width: '500px',
      height: '500px'
    });
  }

  OnDestroy() {
    this.SubscriptionGroup.unsubscribe();
  }
}
