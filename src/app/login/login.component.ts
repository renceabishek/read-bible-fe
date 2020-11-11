import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  invalidLogin = false
   routeTo="";

  model: any ={}

  constructor(private router: Router,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loginservice: AuthenticationService, private route: ActivatedRoute) {
      this.router.events.subscribe(value => {
        if (value instanceof NavigationStart) {
          this.routeTo = value.url;
        }
      });
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
    .subscribe(jwtToken=>{
      sessionStorage.setItem('token', jwtToken)
      sessionStorage.setItem('username', this.model.username)
      this.router.navigate([this.routeTo])
      this.invalidLogin=false;
    },
    error=>{
      console.log("print "+error.status)
      if(error.status="401") {
        this.invalidLogin=true;
      }
    })
  }
}
