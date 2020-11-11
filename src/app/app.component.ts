import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'read-bible-fe';

  constructor(private loginService: AuthenticationService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.url.subscribe(f=>{
      console.log("--"+f)
    })
  }
}
