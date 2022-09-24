import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {User} from "../model/user.model";
import {Observable, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {LoginRequestPayload} from "../model/login-request.payload";
import { ToastrService } from 'ngx-toastr';

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
  isError!: boolean;
  registerSuccessMessage!: string;
  loginRequestPayload!:Observable<LoginRequestPayload>;
  constructor( private fb:FormBuilder,  private activatedRoute: ActivatedRoute,
               private router: Router, private toastr: ToastrService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.LoginFormGroup= this.fb.group({
      username:this.fb.control(null, Validators.required),
      password:this.fb.control(null, Validators.required)
    });
    this.activatedRoute.queryParams
        .subscribe(params => {
          if (params['registered'] !== undefined && params['registered'] === 'true') {
            this.toastr.success('Signup Successful');
            this.registerSuccessMessage = 'Please Check your inbox for activation email '
                + 'activate your account before you Login!';
          }
        });
  }

  handleLogin() {

    let loginRequestPayload=this.LoginFormGroup?.value;

    this.authService.login(loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('/depenses');
      this.toastr.success('Login Successful');

    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
