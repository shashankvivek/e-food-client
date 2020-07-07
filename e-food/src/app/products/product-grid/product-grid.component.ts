
import { ProductsService } from './../products.service';
import { IProduct, IAddedToCartEvent } from './../product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/shared-kernel/util.service';


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
  constructor(public utilSvc: UtilService) { }

  ngOnInit() {
  }

  addToCart(item: IProduct, selectedQty: number) {
    const qty = selectedQty || 0;
    if (qty > 12) {
      this.utilSvc.showSnackBar('A maximum of 12 units can be ordered');
    } else if (qty < 1) {
      this.utilSvc.showSnackBar('Please provide a valid quantity.');
    } else {
      this.addedToCart.emit({product: item, quantity: qty});
    }
    this.quantity = undefined;
  }

}
