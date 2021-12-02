import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DiscussionsService } from 'src/app/services/discussions.service';

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
  message:any = {
    error: "",
    success: "",
  }

  constructor(private route: ActivatedRoute, private dService: DiscussionsService) { }

  ngOnInit(): void {
    console.log(this.discussion);
  }

  removeDiscussion(did:string): void {
    this.dService.removeDiscussion(this.bid, did).subscribe(() => alert("Removed"));
  }

  handleEditDiscussion(): void {
    this.editing = !this.editing;
    this.text = this.discussion.text;
  }

  editDiscussion(did:string): void {
    this.dService.editDiscussion(this.bid, did, {
      d_text: this.text
    }).subscribe(
      (response) => this.message.success = response.message,
      (error) => this.message.error = error.message
    );
  }

}
