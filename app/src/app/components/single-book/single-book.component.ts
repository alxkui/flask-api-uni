import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../home/book/Book';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { DiscussionsService } from 'src/app/services/discussions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book!:Book;
  faLongArrowAltRight = faLongArrowAltRight;

  bid:string = this.route.snapshot.params['id'];
  discussions:any;
  user:any;

  constructor(private route: ActivatedRoute, private booksService: BooksService, private dService: DiscussionsService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
    this.booksService.getSingleBook(this.route.snapshot.params['id'])
    .subscribe(book => {this.book = book; console.log(book);
    });
    this.discussions = this.dService.getDiscussionsOnBook(this.bid);
  }

}
