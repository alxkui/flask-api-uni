import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from './book/Book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: any = [];
  apiInfo: any;
  pageNo: number = 1;
  pageSize: number = 24;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooks(this.pageSize, this.pageNo);

    this.booksService.getApiData().subscribe((data) => (this.apiInfo = data));
    window.addEventListener('scroll', _ => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMoreBooks();
      }
    });
  }

  loadMoreBooks(): void {
    this.pageNo++;
    this.booksService.getBooks(this.pageSize, this.pageNo).subscribe((books) => {
      books.forEach(book => {
        this.books.push(book);
      })
    });
  }

  ngOnDestroy(): void {
    // Not working
    //window.removeEventListener('scroll', this.handleEndOfPage);
  }

}
