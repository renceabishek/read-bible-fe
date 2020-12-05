import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LoginGuardService } from '../login-guard.guard';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: FormGroup;
  invalidSignup=false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

   divMessage = {
     message: "You have registered Successfully! We have sent you the confirmation link to your mail. "+
     "This is just a first time activity for the security reason."+
     "Please do confirm and login. Thanks!",
     enabled: false,
     username: ""
   };

  constructor(private loginService: LoginService,private router: Router,private loginGuard: LoginGuardService,
    private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
      loginService.addGoogleIcons()
      this.signup = formBuilder.group({
        email: ['', { validators : [Validators.pattern(this.emailPattern)], updateOn:'blur'} ],
        fullname: ['', Validators.required],
        username: [{value: '', disabled: true}, ],
        password: ['', [Validators.required, this.isValidPassword()]]
      })
   }
   //, Validators.pattern(this.emailPattern), this.isValidEmail()

   isValidPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const forbidden =  control.value.length <4;
      return forbidden ? { 'passwordSize': { value: control.value } } : null;
    };
   }

   unshowErrorWhenValueIsEmpty(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const forbidden =  control.value.length>0;
      return forbidden ? { 'emptyString': { value: control.value } } : null;
    };
   }

  ngOnInit(): void {
    
  }


  updateUsername(data): void {

    this.signup.controls.username.setValue(this.signup.controls.email.value.split("@")[0]);
  }

  onSubmit(signupForm) {
    this.invalidSignup = false;
    this.loginGuard.invalidLogin = false;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(this.signup.value.password, salt);
    var user = <User>  {
      email: this.signup.value.email,
      name: this.signup.value.fullname,
      password: password
    }
    this.authenticationService.registerUser(user)
    .subscribe(data=>{
            this.loginService.setDataForValidationComponent(this.divMessage);
            this.loginGuard.invalidLogin = true;
            this.router.navigate(["/accounts/getemailconfirmation"])
        
    }, error=> {
      console.log("print error "+JSON.stringify(error))
      console.warn("server error!")
      if(error.status=="400") {
        if(error.error.errorCode=="4101") {
          console.log("user is already registered!")
          this.invalidSignup = true;
        }
      }
    })
  }

  //matcher = new MyErrorStateMatcher();

}


/** Error when control is pristine. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    console.log("touch "+control.touched)
    console.log("dirty "+control.dirty)
    console.log("pristine "+control.pristine)
    console.log(control!.touched && control!.dirty); 
    return !control!.pristine;
  }
} 
