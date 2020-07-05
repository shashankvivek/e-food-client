import { UserAuthService } from './../user-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared-kernel/shared.service';
import { finalize } from 'rxjs/operators';

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
    ]),
  });

  constructor(
    public authSvc: UserAuthService,
    public router: Router,
    public sharedSvc: SharedService
  ) {}

  ngOnInit() {}

  submit(form: FormGroup) {
    if (form.valid) {
      this.loginInProgress = true;
      this.authSvc
        .doLogin(form.get('username').value, form.get('password').value)
        .pipe(finalize(() => (this.loginInProgress = false)))
        .subscribe(
          (res) => {
            if (res.success) {
              localStorage.setItem('access_token', res.token);
              this.router.navigate(['/home']);
            }
          },
          (err) => {
            this.sharedSvc.showSnackBar('Invalid Username / password');
          }
        );
    }
  }
}
