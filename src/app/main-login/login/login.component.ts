import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { NavigationStart, Router } from '@angular/router';
import { ApiErrorResponse } from 'src/app/model/ApiErrorResponse';
import { ApiError } from 'src/app/model/ApiError';
import { LoginGuardService } from '../login-guard.guard';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false
  loading = false;
  routeTo = "";
  divMessage = {
    message: "You still need to verify your email address for this account by confirmation link. If you haven't "+
    "received any confirmation link or your confirmation link already expired. Please resend again by clicking the below button. Thanks",
    enabled: true,
    username: ""
  };

  model: any = {}

  constructor(private router: Router, private loginService: LoginService,
    public authenticationService: AuthenticationService, public loginguard: LoginGuardService) {
    this.router.events.subscribe(value => {
      if (value instanceof NavigationStart) {
        this.routeTo = value.url;
      }
    });
    loginService.addGoogleIcons()
  }

  ngOnInit() {

  }

  checkLoginDis(): boolean {
    return this.model.username == null || this.model.password == null
  }

  JWT_TOKEN = "jwt-token";

  checkLogin() {
    this.invalidLogin = false;
    this.loginguard.invalidLogin = false;
    this.loading = true;
    this.authenticationService.authenticate(this.model.username, this.model.password)
      .subscribe(jwtToken => {
        localStorage.setItem(this.JWT_TOKEN, jwtToken)
        localStorage.setItem('username', this.model.username)
        this.router.navigate([this.routeTo])
        this.invalidLogin = false;
        this.loading = false;
      },
        err => {
          
          this.loading = false;
          let errorResponse = err as ApiErrorResponse
          let error = JSON.parse(err.error) as ApiError;


          if (errorResponse.status == 401) {
            this.invalidLogin = true;
          } else if (errorResponse.status == 400 && error.errorCode == 4100) {
            this.divMessage.username = this.model.username
            this.loginService.setDataForValidationComponent(this.divMessage);
            this.loginguard.invalidLogin = true;
            this.router.navigate(["/accounts/getemailconfirmation"])
          }
        })
  }
}
