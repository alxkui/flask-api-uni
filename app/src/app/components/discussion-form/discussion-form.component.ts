import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DiscussionsService } from 'src/app/services/discussions.service';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-discussion-form',
  templateUrl: './discussion-form.component.html',
  styleUrls: ['./discussion-form.component.scss']
})
export class DiscussionFormComponent implements OnInit {
  user:any;
  text:string = '';
  bid:string = this.route.snapshot.params['id'];
  discussions:any;
  constructor(private userService: UserService, private dService: DiscussionsService, private route: ActivatedRoute, private messagesService: MessagesService) { }
  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
  }

  postDiscussion() {
    if(!this.text) {
      this.messagesService.postErrorMessage("Please don't leave the text box blank :(");
      return
    }

    //const uid = this.user.id;
    const data = {
      bid: this.bid,
      d_text: this.text,
    }
    this.dService.postDiscussion(this.bid, JSON.stringify(data))?.subscribe(res => {
      alert("Thanks for joining the discussion!");
      this.text = "";
      window.location.reload();
    });
  }

}
