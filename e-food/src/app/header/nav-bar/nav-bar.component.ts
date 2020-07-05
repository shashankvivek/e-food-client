import { IUserTokenPayload } from './../../shared-kernel/shared.model';
import { UtilService } from '../../shared-kernel/util.service';
import { CartPreviewComponent } from './../cart-preview/cart-preview.component';
import { HeaderService, Category, ICartItem } from './../header.service';

import { CartService } from './../../cart/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { combineLatest, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared-kernel/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartItems: ICartItem[] = [];
  menuItems: Category[] = [];
  userInfo: IUserTokenPayload;
  SubscriptionGroup = new Subscription();

  constructor(
    public dialog: MatDialog,
    public cartSvc: CartService,
    public headerSvc: HeaderService,
    public sharedSvc: UtilService,
    public authSvc: AuthService
  ) {}

  ngOnInit() {
    this.SubscriptionGroup.add(combineLatest([
      this.headerSvc.getMenuItems(),
      this.headerSvc.getCartPreview(),
      this.headerSvc.addGuestSessionInfo(),
      this.authSvc.getUserInfoFromToken()
    ]).subscribe(responseArray => {
      this.menuItems = responseArray[0];
      this.cartItems = responseArray[1];
      this.userInfo = responseArray[3];
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

  ngOnDestroy() {
    this.SubscriptionGroup.unsubscribe();
  }
}
