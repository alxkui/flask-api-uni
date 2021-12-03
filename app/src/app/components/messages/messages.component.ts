import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  faTimes = faTimes;
  messages:any;
  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe(messages => {
      this.messages = messages
    });
  }

  handleDismiss(type:string, id:string) {
    this.messagesService.clearMessage(type, id);
  }

}
