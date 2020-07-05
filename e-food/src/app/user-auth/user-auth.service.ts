import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ILoginSuccess {
  success: boolean;
  token: string;
}

@Injectable()
export class UserAuthService {
  constructor(
    public http: HttpClient
  ) {}

  doLogin(userEmail: string, pwd: string): Observable<ILoginSuccess> {
    return this.http
      .post<ILoginSuccess>('/login', {
        email: userEmail,
        password: pwd,
      });
  }
}
