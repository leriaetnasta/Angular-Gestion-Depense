import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn!: boolean;
  username!: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  goToUserProfile() {
  }

  logout() {

  }

}
