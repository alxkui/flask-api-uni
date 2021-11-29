import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../components/home/book/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = "/api/v1";

  constructor(private http: HttpClient) { }

  getBooks(pageSize:number, pageNo:number): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `/books?ps=${pageSize}&pn=${pageNo}`);
  }

  getSingleBook(id:String): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + `/books/${id}`);
  }

  getApiData() {
    return this.http.get(this.apiUrl);
  }
}
