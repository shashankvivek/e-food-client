import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartSvc: CartService) { }

  ngOnInit() {
    this.cartSvc.getCheckoutCartItems().subscribe(res => {
      console.log(res);
    });
  }

}
