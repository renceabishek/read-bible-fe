import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../model/Login';
import { Profile } from '../model/Profile';
import { User } from '../model/User';
import { config } from '../util/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  JWT_TOKEN = "jwt-token";

  constructor(private http: HttpClient, private router: Router) { }

  public authenticate(username, password) {
     var loginUser=<Login>  {
     username: username,
     password: password
    }

   return this.http.post(`${config.apiUrl}/auth/token`,loginUser, {responseType: 'text'})
    
  }

  public registerUser(user) {
    return this.http.post(`${config.apiUrl}/auth/register`, user)
  }

  refreshTokens() {

    return this.http.get(`${config.apiUrl}/auth/refreshtoken` , {responseType: 'text'})
    .pipe(tap((token: any) => {
      this.storeJwtToken(token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }


  public sendConfirmationLink(username) {
    var user=<User> {
      username: username
    }
    return this.http.post(`${config.apiUrl}/auth/confirmation-link`, user);
  }


  public isUserLoggedIn() {
    let user = localStorage.getItem('username')
    return !(user === null)
  }

  public logOut() {
    localStorage.removeItem('username')
    localStorage.removeItem(this.JWT_TOKEN)
    this.router.navigate(['accounts/login'])
  }

  cachedRequests: Array<HttpRequest<any>> = [];
public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    this.cachedRequests.forEach(f=>{
      
    })
  }

  
}
