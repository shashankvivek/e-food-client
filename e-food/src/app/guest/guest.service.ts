import { ISuccessResponse } from '../shared-kernel/shared.model';
import { IRegistrationPayload } from './register/register.component';
import { TOKEN_STORAGE_KEY } from '../shared-kernel/contants';
import { IUserTokenPayload } from '../shared-kernel/shared.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

interface ILoginSuccess {
  success: boolean;
  token: string;
}

@Injectable()
export class GuestService {
  constructor(public http: HttpClient) {}

  doLogin(userEmail: string, pwd: string): Observable<ILoginSuccess> {
    return this.http.post<ILoginSuccess>('/v1/login', {
      email: userEmail.trim(),
      password: pwd.trim(),
    });
  }

  registerUser(userInfo: IRegistrationPayload): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>('/v1/register', userInfo);
  }
}
