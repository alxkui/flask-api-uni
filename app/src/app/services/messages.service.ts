import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages:any = {
    success: "",
    error: "",
  }
  private messagesSource = new BehaviorSubject(this.messages);
  messagesProvider = this.messagesSource.asObservable();

  constructor() {}

  postErrorMessage(message:string) {
    this.messagesProvider
      .pipe(
        tap(messages => {
          messages.error = message;
        })
      )
  }

  postSuccessMessage(message:string) {
    this.messagesProvider
      .pipe(
        tap(messages => {
          messages.success = message;
        })
      )
  }

}
