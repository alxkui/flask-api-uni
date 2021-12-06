import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { DiscussionsService } from 'src/app/services/discussions.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books:any = [];
  apiInfo: any;
  pageNo: number = 1;
  pageSize: number = 24;
  user:any;
  discussionCount:number = 0;

  constructor(private booksService: BooksService, private userService: UserService, private dService: DiscussionsService, private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserInfo();

    this.books = this.booksService.getBooks(this.pageSize, this.pageNo).subscribe(res => {
      this.books = res;
    });

    this.booksService.getApiData().subscribe((data) => (this.apiInfo = data));
    
    window.addEventListener('scroll', _ => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMoreBooks();
      }
    });
  }

  countDiscussion(id:string) {
    this.dService.getDiscussionsOnBook(id).subscribe(
      (res) => {
        this.discussionCount = res.length;
      }
    )
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
