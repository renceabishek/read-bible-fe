import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly URL ="https://read-bible-service.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public authenticate(username, password) {
     var loginUser=<Login>  {
     username: username,
     password: password
    }

    this.http.post(this.URL+'auth/token',loginUser, {responseType: 'text'})
    .subscribe(jwtToken=>{
      sessionStorage.setItem('token', jwtToken)
      sessionStorage.setItem('username', username)
      return true;
    })
  }


  public isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  public logOut() {
    sessionStorage.removeItem('username')
  }
}
