import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../components/home/book/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = "http://localhost:5000/api/v1/books";
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
}
