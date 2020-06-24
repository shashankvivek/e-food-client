import { IProduct } from './../product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() product: IProduct;
  constructor() { }

  ngOnInit() {
  }

}
