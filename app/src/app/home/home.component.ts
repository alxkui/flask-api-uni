import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books:any;
  apiData:any;

  constructor(private webService : WebService) {}

  getBooks() {
    this.webService.getBooks()
    .subscribe(res => {
      this.books = res;
    })
  }

  getApiData() {
    this.webService.getApiData()
    .subscribe(res => {
      console.log(res);
      this.apiData = res;
    })
  }

  ngOnInit(): void {
    this.getBooks()
    this.getApiData();
  }

}
