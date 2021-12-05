import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { MessagesService } from 'src/app/services/messages.service';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss']
})
export class PicksComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  loading:boolean = true;
  books:any = [];
  sort:any = {
    ratingCount: false,
    averageRating: false,
  }
  constructor(private messagesService: MessagesService, private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks(1221, 1).subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
      },
      (error) => {
        this.messagesService.postErrorMessage(error.message)
      },
    );
  }

  renderLoading() {
    this.messagesService.postInfoMessage("Loading...");
  }

  clearLoadingMessage() {
    this.messagesService.clearMessage("info", "Loading...");
  }

  renderRatingInt(rating:string) {
    return parseInt(rating).toLocaleString();
  }

  renderRatingFloat(rating:string) {
    return parseFloat(rating);
  }

  sortRatingCount() {
    this.loading = true;
    // set active
    this.sort.ratingCount = !this.sort.ratingCount;

    //disable other ones
    this.sort.averageRating = false;
    this.sort.pages = false;

    // sort
    if(this.sort.ratingCount) {
      this.sortIntDesc();
      this.loading = false;
      return;
    }

    this.sortIntAsc();
    this.loading = false;
  }

  sortAverageRating() {
    this.loading = true;
    // set active
    this.sort.averageRating = !this.sort.averageRating;

    //disabled other ones
    this.sort.ratingCount = false;
    this.sort.pages = false;

    // sort
    if(this.sort.averageRating) {
      this.sortFloatDesc();
      this.loading = false;
      return;
    }

    this.sortFloatAsc();
    this.loading = false;
  }

  sortIntDesc() {
    this.books.sort((a:any, b:any) => {
      return parseInt(b.meta.rating_count) - parseInt(a.meta.rating_count);
    });
  }

  sortIntAsc() {
    this.books.sort((a:any, b:any) => {
      return parseInt(a.meta.rating_count) - parseInt(b.meta.rating_count);
    });
  }

  sortFloatDesc() {
    this.books.sort((a:any, b:any) => {
      return parseFloat(b.meta.rating_value) - parseFloat(a.meta.rating_value);
    });
  }

  sortFloatAsc() {
    this.books.sort((a:any, b:any) => {
      return parseFloat(a.meta.rating_value) - parseFloat(b.meta.rating_value);
    });
  }

}
