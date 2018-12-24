import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _token: string;
  private _userObjId: string; // user Object Id value

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

    return this._http.post(BACKEND_URL + '/signup', authData);

  }

  signIn(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };

    this._http.post<Response>(BACKEND_URL + '/login', authData, { observe: 'response' })
      .subscribe(response => {

        const myTokenValue = response.headers.get('my-token');
        const expiresInDuration = response.body['expiresIn'];

        this._token = myTokenValue;

        // setting timer of 1hour, so that if token expires we need to logout
        this.settingTimerToWatchTokenExpiry(expiresInDuration);

        this._userObjId = response.body['userIdSendFromServer'];
        this.authStatusListener.next(true);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthDataInLocalStorage(myTokenValue, expirationDate, this._userObjId);


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

  getUserId(): string {
    return this._userObjId;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  logout() {
    this._token = null;
    this.authStatusListener.next(false);
    this._userObjId = null;

    clearTimeout(this.tokenTimer); // clears the token timer if we logout manually by clicking the logout btn
    // or automatically when token expires

    this.clearAuthDataFromLocalStorage();

    // redirect to MyMessages page
    this._router.navigate(['/']);
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
      this._userObjId = authInformation.userObjectId;
      // expiresIn -> in sec, but we shld pass  -> settingTimerToWatchTokenExpiry() in millisec
      this.settingTimerToWatchTokenExpiry(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }



  private saveAuthDataInLocalStorage(token: string, expirationDate: Date, userObjectId: string) {
    localStorage.setItem('tokenKey', token);
    localStorage.setItem('expirationKey', expirationDate.toISOString());
    localStorage.setItem('userObjectId', userObjectId);
  }

  private clearAuthDataFromLocalStorage() {
    localStorage.removeItem('tokenKey');
    localStorage.removeItem('expirationKey');
    localStorage.removeItem('userObjectId');
  }

  private getAuthDataFromLocalStorage() {
    const token = localStorage.getItem('tokenKey');
    const expirationDate = localStorage.getItem('expirationKey');
    const userObjectId = localStorage.getItem('userObjectId');
    if (!token || !expirationDate) { // if no values of these key exist in the local Storage then execute this if statement
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userObjectId: userObjectId
    };
  }


}

