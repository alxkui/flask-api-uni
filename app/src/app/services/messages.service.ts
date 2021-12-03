import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages:any = {
    success: [],
    error: [],
  }
  private messagesSource = new BehaviorSubject(this.messages);
  messagesProvider = this.messagesSource.asObservable();

  constructor() {
    console.log("Messaging service active!");
  }

  postErrorMessage(message:string) {
    this.messages.error.push(message);
    setTimeout(() => {
      this.messages.error.pop();
    }, 5000);
  }

  clearMessage(type:string, id:string) {
      const index = this.messages[type].indexOf(id);
      if(index > -1) {
        this.messages[type].splice(index, 1);
      }
  }

  postSuccessMessage(message:string) {
    this.messages.success.push(message);
    setTimeout(() => {
      this.messages.success.pop();
    }, 5000);
  }

  getMessages() {
    return this.messagesProvider;
  }

}
