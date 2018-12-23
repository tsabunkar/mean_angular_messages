import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _token;

  constructor(private _http: HttpClient) { }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };

    this._http.post('http://localhost:3000/api/users/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  signIn(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };

    this._http.post<Response>('http://localhost:3000/api/users/login', authData, { observe: 'response' })
      .subscribe(response => {
        // console.log(response);
        // console.log(response.headers.keys());
        // console.log(response.body);
        console.log(response.headers.get('my-token'));
        this._token = response.headers.get('my-token');

      });
  }

  getToken(): string {
    return this._token;
  }

}

