import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { LoginGuardService } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { MainLoginComponent } from './main-login.component';
import { SignupComponent } from './signup/signup.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [{
  path: '', 
  component: MainLoginComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
      data: { animation: "login" }
    },
    {
      path:'signup',
      component: SignupComponent,
      data: { animation: "signup" }
    },
    {
      path:'getemailconfirmation',
      component: ValidationComponent,
      canActivate: [LoginGuardService],
      data: { animation: "getemailconfirmation" }
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLoginRoutingModule { }
