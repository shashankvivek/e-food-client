import { Router } from '@angular/router';
import { HeaderService } from './../../header/header.service';
import { IBillableCart } from './../cart.model';
import { UtilService } from 'src/app/shared-kernel/util.service';
import { ICartItem } from './../../shared-kernel/shared.model';
import { AuthService } from 'src/app/shared-kernel/auth.service';
import { CartService } from './../cart.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { forkJoin, combineLatest, Subscription, BehaviorSubject } from 'rxjs';
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
    public utilSvc: UtilService,
    public router: Router,
    public headerSvc: HeaderService,
    public cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.prepareCart();
  }

  prepareCart(): void {
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
        this.couponActivated = this.cartData.couponId.length > 0;
        this.userName = res[1].fname;
        this.cartData.totalSaving = this.cartData.totalSaving || 0;
        this.cartData.items = ( this.cartData.items) || [];
        this.cartData.offerItems = ( this.cartData.offerItems) || [];
      });
  }

  QtyChanged(item: ICartItem): void {
    this.cartSvc.updateProductQtyForUser(item, item.quantity).subscribe(res => {
      if (res.success) {
        this.prepareCart();
        this.utilSvc.showSnackBar('Quantity updated successfully');
      } else {
        this.utilSvc.showSnackBar('error updating quantity');
      }
    });
  }

  removeItemFromCart(item: ICartItem) {
      // if total qty of item is  == item.qunatity , then del from cart
      const totalQtyInCart = this.getTotalQtyOfItem(item.productId);
      if (item.quantity === totalQtyInCart) {
        this.headerSvc.removeItemFromCart(item.productId).subscribe(res => {
          if (res.success) {
            this.prepareCart();
            this.utilSvc.showSnackBar('Item removed successfully');
            this.prepareCart();
          } else {
            this.utilSvc.showSnackBar('error removing item');
          }
        });
      } else {
        // just update with remaining qty
        const reducedQty = totalQtyInCart - item.quantity;
        this.cartSvc.updateProductQtyForUser(item, reducedQty).subscribe(res => {
          if (res.success) {
            this.prepareCart();
            this.utilSvc.showSnackBar('Quantity updated successfully');
          } else {
            this.utilSvc.showSnackBar('error updating quantity');
          }
        });
      }


      // else update with remaining qty


  }

  private getTotalQtyOfItem(productId: number): number {
    let totalQty = 0;
    const inItems = this.cartData.items.find(item => item.productId === productId);
    totalQty = inItems.quantity;
    console.log('in items:' + totalQty);

    this.cartData.offerItems.forEach(ruleGroup => {
      ruleGroup.items.forEach(item => {
        if (item.productId === productId) {
          totalQty = totalQty + item.quantity;
        }
      });
    });
    return totalQty;
  }

  removeCoupon(): void {
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
  applyCoupon(): void {
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
          this.cartData.couponId = '';
          this.utilSvc.showSnackBar(err.error);
        }
      );
    }
  }

  createRzpayOrder() {
    this.cartSvc
      .initPaymentProcess(
        this.cartData.totalPrice * 100,
        this.cartData.currency
      )
      .subscribe((res) => {
        this.payWithRazor(res.id);
      });
  }
  private payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_eEsrrirzQRWFdc',
      amount: this.cartData.totalPrice * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'e-food', // company name or product name
      description: '', // product description
      image: './../../assets/diet.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a',
      },
    };
    options.handler = (response, error) => {
      options.response = response;
      this.cartSvc.validatePayment(response).subscribe((res) => {
        // move to order page as per the returned response
        this.headerSvc.resetCart();
        this.cartData = {
          offerItems: [],
          items: [],
          currency: '',
          totalPrice: 0,
          totalSaving: 0,
        };
        this.router.navigate(['/order', res.message]);
        setTimeout(() => {
          window.location.reload(); 
        }, 1000);
      });
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    };
    const rzp = new this.cartSvc.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
