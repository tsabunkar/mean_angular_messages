import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // !interceptor of request which is leaving from frontend to backend

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(req);

    /* const clonedRequest = req.clone();
    const token = this._authService.getToken();
    if (token) {
      clonedRequest.headers.set('authorization', 'Bearer ' + token); // Bearer<space>+token  -> Is industry followed
    } */
    // !ALternatively
    const token = this._authService.getToken();
    console.log('token value from backend', token);
    const clonedRequest = req.clone({
      headers: req.headers.append('authorization', 'Bearer ' + token) // Bearer<space>+token  -> Is industry followed
    });
    console.log('keys', clonedRequest.headers.keys());
    console.log('authorization', clonedRequest.headers.get('authorization'));
    return next.handle(clonedRequest);
  }


}
