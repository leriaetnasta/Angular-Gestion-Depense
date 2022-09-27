import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<unknown>> {
    if (httpRequest.url.includes(environment.backendHost+'/user/login')) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(environment.backendHost+'/user/register')) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(environment.backendHost+'/user/resetpassword')) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadTokenFromLocalCache();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` }});//cloning the request because it's immutable
    return httpHandler.handle(request);
  }

}
