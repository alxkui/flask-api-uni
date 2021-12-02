import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from 'src/app/services/discussions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion-form',
  templateUrl: './discussion-form.component.html',
  styleUrls: ['./discussion-form.component.scss']
})
export class DiscussionFormComponent implements OnInit {
  text:string = "";
  bookid:string = this.route.snapshot.params['id'];
  // token should store ID of user
  user:string = localStorage.getItem("token") ? localStorage.getItem("token") : "";

  constructor(private dService:DiscussionsService, private route:ActivatedRoute) { }

  onSubmit() {
    const discussion = {
      text: this.text,
      book: this.bookid,
      user
    }
    this.dService.addDiscussion()
  }

  ngOnInit(): void {
  }

}
