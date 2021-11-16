import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../home/book/Book';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  public book!:Book;
  constructor(private route: ActivatedRoute, private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getSingleBook(this.route.snapshot.params['id'])
    .subscribe(book => this.book = book);
  }

}
