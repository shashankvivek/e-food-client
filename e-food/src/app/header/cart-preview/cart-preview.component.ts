import { SharedService } from './../../shared-kernel/shared.service';
import { HeaderService } from './../header.service';
import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { ICartItem } from '../header.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatPaginator,
  MatTableDataSource,
} from '@angular/material';

interface ICartPreview {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  cost: number;
}

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss'],
})
export class CartPreviewComponent implements OnInit {
  dataSource: MatTableDataSource<ICartPreview>;
  displayedColumns: string[] = ['image', 'name', 'quantity', 'cost' , 'remove'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  maxItemToShow = [6];
  items: ICartItem[] = [];

  constructor(
    public headerSvc: HeaderService,
    public sharedSvc: SharedService,
    public dialogRef: MatDialogRef<CartPreviewComponent>
  ) {}

  ngOnInit() {
    this.headerSvc.getCartItemEvent().subscribe((items) => {
      this.items = items;
      this.dataSource = new MatTableDataSource<ICartPreview>(
        this.items.map((item) => {
          return {
            productId: item.productId,
            name: item.productName,
            image: item.imageUrl,
            quantity: item.quantity,
            cost: item.quantity * item.unitPrice,
          };
        })
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  closeCart() {
    this.dialogRef.close();
  }

  removeItem(id: number) {
    this.headerSvc.removeItemFromCart(id).subscribe(res => {
      this.sharedSvc.showSnackBar('Item removed successfully');
    }, err => {
      this.sharedSvc.showSnackBar('Error removing item from cart');
    });
  }
}
