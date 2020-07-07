import { AuthService } from 'src/app/shared-kernel/auth.service';
import { ICartItem } from './../../shared-kernel/shared.model';
import { CartService } from './../cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[];
  userName: string;
  qtyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(public cartSvc: CartService, public auth: AuthService) {}

  ngOnInit() {
    // not using forkJoin as there is a bug in the auth0/angular2-jwt library which I used
    // to save time
    combineLatest([
      this.cartSvc.getCheckoutCartItems(),
      this.auth.getUserInfoFromToken(),
    ])
      .pipe(take(1))
      .subscribe((res) => {
        this.cartItems = res[0];
        this.userName = res[1].fname;
      });
  }
}
