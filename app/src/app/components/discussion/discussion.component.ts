import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { DiscussionsService } from 'src/app/services/discussions.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  loading:boolean = true;
  discussions:any;

  constructor(private booksService: BooksService, private dService: DiscussionsService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.postInfoMessage("Loading discussions...");

    this.dService.getAllDiscussion().subscribe(
      (res) => {
        this.discussions = res.data.map((discussion:any) => discussion.discussion);
        this.loading = false;
        if(!this.loading) this.messagesService.clearMessage('info', "Loading discussions...")
      },
      (error) => {
        this.messagesService.postErrorMessage(error.message);
      }
    )
  }

  renderBookTitle(title:string) {
    return title.length > 35 ? `${title.substr(0, 35)}...` : `${title}`;
  }

}
