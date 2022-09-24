import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SignupRequestPayload} from "../model/singup-request.payload";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";
import {Depense} from "../model/depense.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ADDsignupRequestPayload!: FormGroup;
  signUpRequestPlayload$ !:Observable<SignupRequestPayload>;

  signupForm!: FormGroup;
  constructor(private authService: AuthenticationService,private fb:FormBuilder, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.signupForm= this.fb.group({
      username:  this.fb.control('', Validators.required),
      email:  this.fb.control('', [Validators.required, Validators.email]),
      password:  this.fb.control('', Validators.required)
    });

  }




  signup() {
    let signUpRequestPlayload$=this.signupForm?.value;

    this.authService.signup(signUpRequestPlayload$)
        .subscribe(data => {
          this.router.navigate(['/login'],
              { queryParams: { registered: 'true' } });
        }, error => {
          console.log(error);
          this.toastr.error('Registration Failed! Please try again');

        });
  }

}
