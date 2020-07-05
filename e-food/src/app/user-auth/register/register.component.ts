import { UtilService } from 'src/app/shared-kernel/util.service';

import { UserGatewayService } from './../user-gateway.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared-kernel/auth.service';

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
    mobile: new FormControl('', [Validators.maxLength(10)]),
  });

  constructor(
    public gatewaySvc: UserGatewayService,
    public sharedSvc: UtilService,
    public authSvc: AuthService
  ) {}

  ngOnInit() {}

  submit() {}
}
