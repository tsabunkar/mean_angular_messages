import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // !Garud is Service, it is used to protect the routes.

  constructor(private _authService: AuthService,
    private _router: Router
  ) { }

  isAuth: boolean;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
      });

    if (!this.isAuth) { // not authenticated, so redirect to login page
      this._router.navigate(['/login']);
    }
    return this.isAuth;

    // return true; // true means -> Can be redirect to route
  }
}
