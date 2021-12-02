import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {
  private apiUrl = "/api/v1";

  constructor(private http: HttpClient, private userService: UserService) {}

  postDiscussion(bid:string, data:any) {    
      return this.http.post<any>(this.apiUrl + `/books/${bid}/discussions`, data, this.userService.getHeaders());
  }

  editDiscussion(bid:string, did:string, data:any) {    
    return this.http.put<any>(this.apiUrl + `/books/${bid}/discussions/${did}`, data, this.userService.getHeaders());
  }
  
  removeDiscussion(bid:string, did:string) {    
    return this.http.delete<any>(this.apiUrl + `/books/${bid}/discussions/${did}`, this.userService.getHeaders());
  } 

  getDiscussionsOnBook(bid:string) {
    return this.http.get<any>(this.apiUrl + `/books/${bid}/discussions`, this.userService.getHeaders());
  }
}
