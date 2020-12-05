import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLoginRoutingModule } from './main-login-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainLoginComponent } from './main-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationComponent } from './validation/validation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    MainLoginComponent,
    SignupComponent,
    LoginComponent,
    ValidationComponent
  ],
  imports: [
    //BrowserModule,
    FormsModule,
    CommonModule,
    // BrowserAnimationsModule,
    MainLoginRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class MainLoginModule { }
