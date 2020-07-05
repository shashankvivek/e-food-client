import { IUserTokenPayload } from './shared.model';
import { TOKEN_STORAGE_KEY } from './contants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilService } from './util.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenPayload$ = new BehaviorSubject<IUserTokenPayload>({
    user: '',
    authorized: false,
    exp: 0,
    fname: '',
    lname: '',
  });

  constructor(
    public router: Router,
    public utilSvc: UtilService,
    public jwtSvc: JwtHelperService
  ) {}

  setUserToken(token: string): void {
    // decode token just decodes the Payload and not the
    // Header or Signature
    let payload: IUserTokenPayload;
    try {
      payload = this.jwtSvc.decodeToken(token);
    } catch (err) {
        this.logoutUser();
    }
    if (!this.jwtSvc.isTokenExpired(token)) {
      payload.isCustomer = payload.user !== '';
      this.tokenPayload$.next(payload);
    } else {
      this.utilSvc.showSnackBar('Invalid session. Please login again');
      this.logoutUser();
    }
  }

  logoutUser() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.router.navigate(['/user/login']);
  }

  getUserInfoFromToken(): Observable<IUserTokenPayload> {
    return this.tokenPayload$.asObservable();
  }

  loginSuccess(token: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    this.router.navigate(['/home']);
  }
}
