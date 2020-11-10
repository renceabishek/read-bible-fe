import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  invalidLogin = false

  model: any ={}

  constructor(private router: Router,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loginservice: AuthenticationService, private route: ActivatedRoute) {
      this.addGoogleIcons()
     }

  ngOnInit() {
  }

  checkLoginDis(): boolean {
   return this.model.username==null || this.model.password==null
  }

  addGoogleIcons(): void {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/google.svg")
    );
  }

  checkLogin() {
    //alert("still success")
    this.loginservice.authenticate(this.model.username, this.model.password)
    this.router.navigate([''])
     this.invalidLogin = false
  }
}
