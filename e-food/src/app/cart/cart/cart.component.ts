import { IBillableCart } from './../cart.model';
import { UtilService } from 'src/app/shared-kernel/util.service';
import { ICartItem } from './../../shared-kernel/shared.model';
import { AuthService } from 'src/app/shared-kernel/auth.service';
import { CartService } from './../cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, combineLatest, Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: IBillableCart = {
    offerItems: [],
    items: [],
    currency: '',
    totalPrice: 0,
    totalSaving: 0,
  };
  couponActivated: boolean;
  userName: string;
  qtyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  loading = false;
  constructor(
    public cartSvc: CartService,
    public auth: AuthService,
    public utilSvc: UtilService
  ) {}

  ngOnInit() {
    this.prepareCart();
  }

  prepareCart() {
    this.loading = true;
    // not using forkJoin as there is a bug in the auth0/angular2-jwt library which I used
    // to save time
    combineLatest([
      this.cartSvc.getCheckoutCartItems(),
      this.auth.getUserInfoFromToken(),
    ])
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        this.cartData = res[0];
        this.cartData.couponId = this.cartData.couponId || '';
        this.couponActivated = this.cartData.couponId.length > 0 ;
        this.userName = res[1].fname;
      });
  }

  QtyChanged(item: ICartItem) {
    this.cartSvc.postProductQtyForUser(item).subscribe((res) => {
      this.utilSvc.showSnackBar(res.message);
      this.prepareCart();
    });
  }

  removeCoupon() {
    this.cartSvc.removeCouponFromCart(this.cartData.couponId).subscribe(
      (res) => {
        if (res.success) {
          this.prepareCart();
        }
        console.log(res);
      },
        (err) => {
          console.log(err);
          this.utilSvc.showSnackBar(err);
        }
    );
  }
  applyCoupon() {
    if (this.cartData.couponId !== '') {
      this.cartSvc.applyCouponToCart(this.cartData.couponId).subscribe(
        (res) => {
          if (res.success) {
            this.prepareCart();
          }
          console.log(res);
        },
          (err) => {
            console.log(err.error);
            this.utilSvc.showSnackBar(err.error);
          }
      );
    }

  }
}