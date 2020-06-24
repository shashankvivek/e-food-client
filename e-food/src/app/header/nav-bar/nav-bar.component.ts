import { MenuModalComponent } from './../../cart/menu-modal/menu-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openCartModal() {
    const dialogRef = this.dialog.open(MenuModalComponent, {
      width: '500px',
      height: '500px'
    });
  }
}
