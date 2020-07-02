import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { ICartItem } from '../header.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatPaginator,
  MatTableDataSource,
} from '@angular/material';

interface ICartPreview {
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
  displayedColumns: string[] = ['image', 'name', 'quantity', 'cost'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  maxItemToShow = [6];

  constructor(
    @Inject(MAT_DIALOG_DATA) public items: ICartItem[],
    public dialogRef: MatDialogRef<CartPreviewComponent>
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ICartPreview>(
      this.items.map((item) => {
        return {
          name: item.productName,
          image: item.imageUrl,
          quantity: item.quantity,
          cost: item.quantity * item.unitPrice,
        };
      })
    );
    this.dataSource.paginator = this.paginator;
  }

  closeCart() {
    this.dialogRef.close();
  }
}
