import { SharedService } from './../../shared-kernel/shared.service';
import { HeaderService } from './../../header/header.service';
import { IProduct, IAddedToCartEvent } from './../product.model';
import { ProductsService } from './../products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[];
  subscriptions = new Subscription();

  constructor(
    public prodSvc: ProductsService,
    public route: ActivatedRoute,
    public headerSvc: HeaderService,
    public sharedSvc: SharedService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.params
        .pipe(
          switchMap((params) =>
            combineLatest(
              this.prodSvc.getProductsByGroupId(params.id),
              this.headerSvc.getCartItemEvent()
            )
          )
        )
        .subscribe(([productList, cartItemList]) => {
          productList.forEach((product) => {
            product.isAddedToCart = !!cartItemList.find(
              (item) => item.productId === product.productId
            );
          });
          this.products = productList;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addItem(event: IAddedToCartEvent) {
    this.prodSvc.addItemToCart(event).subscribe(
      (response) => {
        if (response.success) {
          this.headerSvc.updateCart({product: event.product, quantity: response.qtyAdded});
          this.sharedSvc.showSnackBar(response.message);
        }
      },
      (err) => {
        this.sharedSvc.showSnackBar('Error adding item to the cart ');
      }
    );
  }
}
