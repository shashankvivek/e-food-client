import { IProduct } from './../product.model';
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

  constructor(public prodSvc: ProductsService, public route: ActivatedRoute) {}

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
}
