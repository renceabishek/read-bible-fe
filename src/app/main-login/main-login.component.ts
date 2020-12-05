import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
  animations: [ slideInAnimation ]
})
export class MainLoginComponent implements OnInit {

  constructor(private router: Router) { 
    // const config = this.router.config;
    //   config.push({
    //     path: 'dash',
    //     loadChildren: () => import('../main-app/main-app.module').then(m => m.MainAppModule)
    //   });
    //   this.router.resetConfig(config);
    //   this.router.navigate(['dash']);
  }

  ngOnInit(): void {
    //this.router.navigate([{ outlets: { signuplogin: ['login'] } }])
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
