import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {

  title = 'bible-read-fe';
  JWT_TOKEN = "jwt-token";
  isAdmin : boolean = false;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public loginService: AuthenticationService) {
      this.mobileQuery = media.matchMedia('(max-width: 959px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    var parseJwt = JSON.parse(atob(localStorage.getItem(this.JWT_TOKEN).split('.')[1]));
    this.isAdmin = parseJwt.scopes.filter(scope=>scope.authority=="ROLE_ADMIN").length >0;


  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
