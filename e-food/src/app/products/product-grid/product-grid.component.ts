import { ProductsService } from './../products.service';
import { IProduct, IAddedToCartEvent } from './../product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() product: IProduct;
  @Output() addedToCart = new EventEmitter<IAddedToCartEvent>();

  // disable add to cart if the prod is already in cart
  constructor() { }

  ngOnInit() {
  }

  addToCart(item: IProduct, qty: number) {
    this.addedToCart.emit({product: item, quantity: qty});
  }

}
