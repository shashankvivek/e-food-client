import { TOKEN_STORAGE_KEY } from './../../shared-kernel/contants';
import { UserGatewayService } from '../user-gateway.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UtilService } from 'src/app/shared-kernel/util.service';
import { AuthService } from 'src/app/shared-kernel/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginInProgress = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%+\'-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)
    ]),
  });

  constructor(
    public gatewaySvc: UserGatewayService,
    public sharedSvc: UtilService,
    public authSvc: AuthService
  ) {}

  ngOnInit() {}

  submit(form: FormGroup) {
    if (form.valid) {
      this.loginInProgress = true;
      this.gatewaySvc
        .doLogin(form.get('username').value, form.get('password').value)
        .pipe(finalize(() => (this.loginInProgress = false)))
        .subscribe(
          (res) => {
            if (res.success) {
              this.authSvc.loginSuccess(res.token);
            }
          },
          (err) => {
            this.sharedSvc.showSnackBar('Invalid Username / password');
          }
        );
    }
  }
}
