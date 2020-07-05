import { IUserTokenPayload } from './shared-kernel/shared.model';
import { TOKEN_STORAGE_KEY } from './shared-kernel/contants';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './shared-kernel/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-food';

  constructor(public jwtSvc: JwtHelperService, public authSvc: AuthService) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      this.authSvc.setUserToken(token);
    }
  }
}
