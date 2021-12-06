import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DiscussionsService } from 'src/app/services/discussions.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-single-discussion',
  templateUrl: './single-discussion.component.html',
  styleUrls: ['./single-discussion.component.scss']
})
export class SingleDiscussionComponent implements OnInit {
  @Input() discussion:any;
  @Input() user:any;

  faTrash = faTrash;
  faEdit = faEdit;
  bid:string = this.route.snapshot.params['id'];
  editing:boolean = false;
  text:any;

  constructor(private route: ActivatedRoute, private dService: DiscussionsService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    //console.log(this.discussion);
  }

  removeDiscussion(did:string): void {
    this.dService.removeDiscussion(this.bid, did).subscribe(
      (res) => {
        this.messagesService.postSuccessMessage(res.message);
        window.location.reload();
      },
      (error) => {
        this.messagesService.postErrorMessage(error.error.message);
      }
    );
  }

  handleEditDiscussion(): void {
    this.editing = !this.editing;
    this.text = this.discussion.text;
  }

  editDiscussion(did:string): void {
    if(!this.text.replace(/\s/g, '').length || !this.text) {
      this.messagesService.postErrorMessage("Please don't leave the form empty");
      return;
    }
    this.dService.editDiscussion(this.bid, did, {
      d_text: this.text
    }).subscribe(
      (response) => {
        this.messagesService.postSuccessMessage(response.message);
        window.location.reload();
      },
      (error) => {
        this.messagesService.postErrorMessage(error.error.message);
      }
    );
  }

}
