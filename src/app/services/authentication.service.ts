import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from "../model/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SignupRequestPayload} from "../model/singup-request.payload";
import {map, Observable, tap, throwError} from "rxjs";
import {LoginRequestPayload} from "../model/login-request.payload";
import {LoginResponse} from "../model/login-response.payload";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }



  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(environment.backendHost +'/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(environment.backendHost +'/api/auth/login',
        loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }));
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(environment.backendHost +'/api/auth/refresh/token',
        this.refreshTokenPayload)
        .pipe(tap(response => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store('authenticationToken',
              response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        }));
  }

  logout() {
    this.httpClient.post(environment.backendHost +'/api/auth/logout', this.refreshTokenPayload,
        { responseType: 'text' })
        .subscribe(data => {
          console.log(data);
        }, error => {
          throwError(error);
        })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}

