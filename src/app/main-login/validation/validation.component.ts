import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { error } from 'protractor';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  divMessage="";
  isShow=true;
  username="";
  isConfirmed=true;
  model: any = {}
  disabled = false;

  constructor(private loginService: LoginService, private authenticationService: AuthenticationService) {
    loginService.addGoogleIcons();
   }

  ngOnInit(): void {
    this.loginService.validationComponentData.subscribe(value=> {
      this.divMessage = value.message;
      this.isShow = value.enabled;
      this.username = value.username;
    })
  }

  reSendConfirmationLink() {
    console.log("resending confirmation link!");
    this.authenticationService.sendConfirmationLink(this.username).subscribe(data=> {
      this.divMessage = "We have sent you the confirmation link to your mail. "+
      "Please do confirm and login. Thanks!";
      this.isShow = false;
      this.username = "";
    }, error=> {

    });
  }

  isChecked() {
    if(this.model.confirmation) {

    }
  }

}
