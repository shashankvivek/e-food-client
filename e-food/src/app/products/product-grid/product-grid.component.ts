import { SharedService } from './../../shared-kernel/shared.service';
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
  quantity: number;
  // disable add to cart if the prod is already in cart
  constructor(public sharedSvc: SharedService) { }

  ngOnInit() {
  }

  addToCart(item: IProduct, selectedQty: number) {
    const qty = selectedQty || 0;
    if (qty > 12) {
      this.sharedSvc.showSnackBar('A maximum of 12 units can be ordered');
    } else if (qty < 1) {
      this.sharedSvc.showSnackBar('Please provide a quantity.');
    } else {
      this.addedToCart.emit({product: item, quantity: qty});
    }
    this.quantity = undefined;
  }

}
