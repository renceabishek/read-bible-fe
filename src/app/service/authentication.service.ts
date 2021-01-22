import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { Profile } from '../model/Profile';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly URL ="http://localhost:8082/";
  //private readonly URL ="https://read-bible-service.herokuapp.com/";

  constructor(private http: HttpClient, private router: Router) { }

  public authenticate(username, password) {
     var loginUser=<Login>  {
     username: username,
     password: password
    }

   return this.http.post(this.URL+'auth/token',loginUser, {responseType: 'text'})
    
  }

  public registerUser(user) {
    return this.http.post(this.URL+'auth/register', user)
  }

  public sendConfirmationLink(username) {
    var user=<User> {
      username: username
    }
    return this.http.post(this.URL+'auth/confirmation-link', user);
  }


  public isUserLoggedIn() {
    let user = localStorage.getItem('username')
    return !(user === null)
  }

  public logOut() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.router.navigate(['accounts/login'])
  }
}
