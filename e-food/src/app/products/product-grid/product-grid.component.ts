import { CartService } from './../../cart/cart.service';
import { IProduct } from './../product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() product: IProduct;

  // disable add to cart if the prod is already in cart
  constructor(public cartSvc: CartService) { }

  ngOnInit() {
  }

  addToCart(item: IProduct) {
    this.cartSvc.addProductToCart(item);
  }

}
