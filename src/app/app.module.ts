import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DepensesComponent } from './depenses/depenses.component';
import { DeplacementsComponent } from './deplacements/deplacements.component';
import { ProjetsComponent } from './projets/projets.component';
import { ClientsComponent } from './clients/clients.component';
import { EmployesComponent } from './employes/employes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxWebstorageModule} from "ngx-webstorage";
import {ToastrModule} from "ngx-toastr";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./services/notification.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DepensesComponent,
    DeplacementsComponent,
    ProjetsComponent,
    ClientsComponent,
    EmployesComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    NotificationModule,

  ],
  providers: [NotificationService,AuthenticationGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]

})
export class AppModule { }
