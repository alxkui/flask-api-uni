import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    BASE_URL = "http://localhost:5000/api/v1"

    constructor(private http: HttpClient) {}

    getBooks() {
        return this.http.get(`${this.BASE_URL}/books`);
    }

    getApiData() {
        return this.http.get(`${this.BASE_URL}/`);
    }
}