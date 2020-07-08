import { UtilService } from 'src/app/shared-kernel/util.service';
import { GuestService } from '../guest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared-kernel/auth.service';
import { Router } from '@angular/router';

export interface IRegistrationPayload {
  email: string;
  password: string;
  fname: string;
  lname: string;
  phoneNo: number;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginInProgress = false;
  regForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%+\'-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$'),
    ]),
    fname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    lname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]),
    mobile: new FormControl('', [
      Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*')
    ]),
  });

  constructor(
    public gatewaySvc: GuestService,
    public utilSvc: UtilService,
    public authSvc: AuthService,
    public router: Router
  ) {}

  ngOnInit() {}

  submit(form: FormGroup) {
    if (form.valid) {
      const payload: IRegistrationPayload = {
        email: form.get('username').value,
        fname: form.get('fname').value,
        lname: form.get('lname').value,
        password: form.get('pwd').value,
        phoneNo: form.get('mobile').value
      };

      this.gatewaySvc.registerUser(payload).subscribe(
        (res) => {
          if (res.success) {
            this.utilSvc.showSnackBar('User Registered successfully');
            this.router.navigate(['../login']);
          } else {
            this.utilSvc.showSnackBar(res.message);
          }
        },
        (err) => {
          this.utilSvc.showSnackBar(err);
        }
      );
    }
  }
}
