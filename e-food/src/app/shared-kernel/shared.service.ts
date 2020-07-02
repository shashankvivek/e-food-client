import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SharedService {
  constructor(public snackBar: MatSnackBar) {}

  showSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 8000,
    });
  }
}
