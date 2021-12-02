import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "/api/v1/auth";
  public token:any;
  tokenExists = sessionStorage.getItem("token") || false;

  constructor(private http: HttpClient) {}

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Authorization': this.getUserToken(),
      }),
    };
    console.log(this.tokenExists);
    return httpOptions
  }

  registerUser(user:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/register`, user, this.getHeaders());
  }

  loginUser(user:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/login`, user, this.getHeaders());
  }

  getUserToken():any {
    if(sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
      return this.token;
    }
    return false;
  }

  getUserInfo():any {
    if(sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
      return jwtDecode(this.token);
    }
    return false;
  }

  logoutUser():any {
    if(sessionStorage.getItem("token")) {
      const token:any = sessionStorage.getItem("token");
      const httpOptions2 = {
        headers: new HttpHeaders({
          'Authorization': token,
        }),
      };
      console.log("hello world");
      return this.http.get(this.apiUrl + '/logout', httpOptions2);
    }
    return;
  }

}
