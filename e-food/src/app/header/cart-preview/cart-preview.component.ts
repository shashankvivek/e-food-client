import { AuthService } from 'src/app/shared-kernel/auth.service';
import { ICartItem } from './../../shared-kernel/shared.model';
import { HeaderService } from './../header.service';
import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatPaginator,
  MatTableDataSource,
} from '@angular/material';
import { UtilService } from 'src/app/shared-kernel/util.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

interface ICartPreview {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  cost: number;
  currency: string;
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
  isGuest: boolean;
  qtyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    public headerSvc: HeaderService,
    public utilSvc: UtilService,
    public dialogRef: MatDialogRef<CartPreviewComponent>,
    public authSvc: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.authSvc.getUserInfoFromToken().pipe(take(1)).subscribe(userInfo => {
      this.isGuest = !userInfo.isCustomer;
    });
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
            currency: item.currency
          };
        })
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  QtyChanged(item: ICartItem) {
    this.headerSvc.updateProductQty(item).subscribe(res => {
      if (res.success) {
        this.utilSvc.showSnackBar('Quantity updated successfully');
      } else {
        this.utilSvc.showSnackBar('error updating quantity');
      }
    });
  }

  closeCart() {
    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(['/guest/login']);
  }

  goToCart() {
    this.dialogRef.close();
    this.router.navigate(['/cart']);
  }
  removeItem(id: number) {
    this.headerSvc.removeItemFromCart(id).subscribe(res => {
      this.utilSvc.showSnackBar('Item removed successfully');
    }, err => {
      this.utilSvc.showSnackBar('Error removing item from cart');
    });
  }
}
