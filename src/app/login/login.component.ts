import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user.model";
import {Observable, Subscription, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {NotificationService} from "../services/notification.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../enum/notification-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginFormGroup!: FormGroup;
  password: string | undefined;
  username: string | undefined;
  errorObj: Object | undefined;
  errorMsg: String | undefined;
  user!:Observable<User>;
  registerSuccessMessage!: string;

  private subscriptions: Subscription[] = [];



  constructor( private fb:FormBuilder,  private activatedRoute: ActivatedRoute,
               private router: Router, private notificationService:NotificationService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/depenses');
    } else {
      this.router.navigateByUrl('/login');
    }
    this.LoginFormGroup= this.fb.group({
      username:this.fb.control(null, Validators.required),
      password:this.fb.control(null, Validators.required)
    });
    this.activatedRoute.queryParams
        .subscribe(params => {
          if (params['registered'] !== undefined && params['registered'] === 'true') {
            this.registerSuccessMessage = 'Please Check your inbox for activation email '
                + 'activate your account before you Login!';
          }
        });
  }

  handleLogin() {

    let loginRequest=this.LoginFormGroup?.value;

    this.authService.login(loginRequest).subscribe((response:HttpResponse<User>|HttpErrorResponse) => {
      const token=response.headers.get('Jwt-Token');
      this.authService.saveToken(token);
      this.authService.addUserToLocalCache(response.body);
      this.router.navigateByUrl('/depenses');

    }, (error:HttpErrorResponse) => {
      console.log(error);
      this.sendErrorNotification(NotificationType.ERROR, error.error.message());

    });
  }




  ngOnDestroy(): void {}


  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
