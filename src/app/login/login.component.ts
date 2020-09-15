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

  username = 'bible'
  password = ''
  invalidLogin = false

  constructor(private router: Router,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loginservice: AuthenticationService, private route: ActivatedRoute) {
      this.addGoogleIcons()
     }

  ngOnInit() {
  }

  addGoogleIcons(): void {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/google.svg")
    );
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate([''])
      //this.router.navigate([{ outlets: {primary: 'admin', adminbar: ['instructions'] } }]);
      //this.router.navigate([{ outlets: { primary: 'check', adminbar: ['instructions'] } }], {relativeTo: this.route});
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
