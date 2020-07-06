import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(public jwtSvc: JwtHelperService, public router: Router) {}

  canActivate(): boolean {
      if (this.jwtSvc.isTokenExpired()) {
        this.router.navigate(['/guest/login']);
        return false;
      }
      return true;
  }
}
