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
export class DiscussionsService {

  constructor(private http: HttpClient) { }

  private apiUrl = `http://localhost:5000/api/v1/books/${bookId}/discussions`;

  addDiscussion(discussion:any, bookid:string): Observable<any> {
    return this.http.post<any>(this.apiUrl, discussion, httpOptions);
  }
}
