import { IProduct } from './../product.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: IProduct[];

  constructor(public prodSvc: ProductsService) { }

  ngOnInit() {
    this.prodSvc.getProductsByGroupId('apple').subscribe(response => {
      this.products = response.products;
    });
  }

}
