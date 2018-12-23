import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _token;
  // private authStatusListener = new Subject<boolean>(); // this subject is used to-> push authentication inform which r interested

  // !using ReplySubject bcoz-> late subject subscriptions will miss out on the data that was emitted previously.
  // !Replay subjects can help with that by keeping a buffer of previous values that will be emitted to new subscriptions.
  private authStatusListener = new ReplaySubject<boolean>();
  private tokenTimer: NodeJS.Timer;

  constructor(private _http: HttpClient,
    private _router: Router
  ) { }

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

        // setting timer of 1hour, so that if token expires we need to logout
        this.settingTimerToWatchTokenExpiry(response.body['expiresIn']);


        this._token = response.headers.get('my-token');
        this.authStatusListener.next(true);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.body['expiresIn'] * 1000);
        this.saveAuthDataInLocalStorage(response.headers.get('my-token'), expirationDate);


        // redirect to MyMessages page
        this._router.navigate(['/']);



      });
  }

  // !setting timer of 1hour, so that if token expires we need to logout
  private settingTimerToWatchTokenExpiry(expiresInDuration) {   // token expires in 3600sec
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000); // bcoz- milliseconds
  }

  getToken(): string {
    return this._token;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  logout() {
    this._token = null;
    this.authStatusListener.next(false);

    clearTimeout(this.tokenTimer); // clears the token timer if we logout manually by clicking the logout btn
    // or automatically when token expires

    this.clearAuthDataFromLocalStorage();

    // redirect to MyMessages page
    this._router.navigate(['/']);
  }

  private saveAuthDataInLocalStorage(token: string, expirationDate: Date) {
    localStorage.setItem('tokenKey', token);
    localStorage.setItem('expirationKey', expirationDate.toISOString());
  }

  private clearAuthDataFromLocalStorage() {
    localStorage.removeItem('tokenKey');
    localStorage.removeItem('expirationKey');
  }

  autoAuthenticateUserWhenPageReload() {
    const authInformation = this.getAuthDataFromLocalStorage();

    if (!authInformation) { // if authInformation object is empty
      return;
    }

    // !check weather if token is valid
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); // (timestamp from furtue)sec - (Current TimeStamp)sec

    if (expiresIn > 0) { // user is authenticated, only if expiresIn > 0 , means time is in the future
      this._token = authInformation.token;
      // expiresIn -> in sec, but we shld pass  -> settingTimerToWatchTokenExpiry() in millisec
      this.settingTimerToWatchTokenExpiry(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  private getAuthDataFromLocalStorage() {
    const token = localStorage.getItem('tokenKey');
    const expirationDate = localStorage.getItem('expirationKey');
    if (!token || !expirationDate) { // if no values of these key exist in the local Storage then execute this if statement
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }


}

