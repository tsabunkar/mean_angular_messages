import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

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

}

