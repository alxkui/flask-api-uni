import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:5000/api/v1/auth";

  constructor(private http: HttpClient) { }

  registerUser(user:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/register`, user, httpOptions);
  }

  loginUser(user:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/login`, user, httpOptions);
  }

}
