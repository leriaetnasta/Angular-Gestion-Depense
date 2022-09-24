import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {User} from "../model/user.model";
import {Client} from "../model/clients.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  SESSION_KEY = 'auth_user'

  username!: string | null;
  password!: string | null;

  constructor(private http: HttpClient) {   }
  authenticate(username: string, password: string) {
    return this.http.get(environment.backendHost+"/auth", {
      headers: { authorization: this.createBasicAuthToken(username, password) }}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerInSession(username, password);
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerInSession(username: string , password: string) {
    sessionStorage.setItem(this.SESSION_KEY, username)
  }

  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.username = null;
    this.password =null;
  }

  isUserLoggedin() {
    let user = sessionStorage.getItem(this.SESSION_KEY)
    if (user === null) return false
    return true
  }

  getLoggedinUser() {
    let user = sessionStorage.getItem(this.SESSION_KEY)
    if (user === null) return ''
    return user
  }
}
