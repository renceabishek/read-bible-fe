import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteUpComponent } from './write-up/write-up.component';
import { ReadersComponent } from './readers/readers.component';
import { SignupComponent } from './main-login/signup/signup.component';
import { LoginComponent } from './main-login/login/login.component';
import { FragmentComponent } from './util/fragment/fragment.component';
import { AuthGuardService } from './service/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-app/main-app.module').then(m => m.MainAppModule),
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   outlet: "mainlogin"
  // },
  {
    path: 'accounts',
    loadChildren: () => import('./main-login/main-login.module').then(m => m.MainLoginModule),
    canLoad: [AuthGuardService]
  }, 
  {
    path: 'readers',
    component: ReadersComponent,
    outlet: "main",
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'status',
  //   component: StatisticsComponent,
  //   outlet: "main",
  //   canActivate: [AuthGuardService]
  // },
  {
    path: 'writeup',

    component: WriteUpComponent,
    outlet: "main",
    canActivate: [AuthGuardService]
  }
  // {
  //   path: 'emailsignup',
  //   component: SignupComponent,
  //   outlet: "mainlogin"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
