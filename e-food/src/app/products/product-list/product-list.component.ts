import { SharedService } from './../../shared-kernel/shared.service';
import { HeaderService } from './../../header/header.service';
import { IProduct, IAddedToCartEvent } from './../product.model';
import { ProductsService } from './../products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
          switchMap((params) => this.prodSvc.getProductsByGroupId(params.id))
        )
        .subscribe((response) => {
          this.products = response;
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
          this.headerSvc.updateCart(event);
        }
      },
      (err) => {
        // this.sharedSvc.showSnackBar();
        // show the error message as snack bar
      }
    );
  }
}
