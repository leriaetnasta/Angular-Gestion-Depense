import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from "../model/user.model";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable, tap, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token:any;
  private loggedInUsername:any ;
  private jwtHelper=new JwtHelperService();
  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(environment.backendHost+"/user/login", user, { observe: 'response' });
  }
  public register(user: User):  Observable<User|HttpErrorResponse>{
    return this.http.post<User|HttpErrorResponse>(environment.backendHost+"/user/register", user);
  }
  public logOut():  void{
    this.token=null;
    this.loggedInUsername=null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');

  }
  public saveToken(token:string):  void{
    this.token=token;
    localStorage.setItem('token',token); // token:'fsggerger'
  }
  public addUserToLocalCache(user:User):void{ // add the user to localstorage
    localStorage.setItem('user',JSON.stringify(user));
  }
  public getUserFromLocalCache():User{
    return JSON.parse(localStorage.getItem("user")||'{}');
  }
  public loadTokenFromLocalCache():void{
    this.token=localStorage.getItem('token');
  }
  public getToken():string{
    return this.token;
  }

  //function to check if user is logged in or not
  public isLoggedIn():boolean{
    this.loadTokenFromLocalCache();
    if(this.token!=null && this.token!==''){
      if(this.jwtHelper.decodeToken(this.token).sub!=null||''){
        if(this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername=this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else{
      this.logOut();
      return false;
    }
    return false;
  }
}

