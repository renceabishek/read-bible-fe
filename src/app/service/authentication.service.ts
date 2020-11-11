import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private readonly URL ="http://localhost:8082/";
  private readonly URL ="https://readbibleintegration.firebaseio.com/";

  constructor(private http: HttpClient, private router: Router) { }

  public authenticate(username, password) {
     var loginUser=<Login>  {
     username: username,
     password: password
    }

   return this.http.post(this.URL+'auth/token',loginUser, {responseType: 'text'})
    
  }


  public isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  public logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    this.router.navigate([''])
  }
}
