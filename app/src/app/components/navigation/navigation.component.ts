import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BooksService } from 'src/app/services/books.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  token:any;
  user:any;
  searchTerm:string = "";
  searchBookMatch:any;
  searchActive:boolean = false;

  constructor(private userService: UserService, private messagesService: MessagesService, private booksService: BooksService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
      this.user = jwtDecode(this.token);
    }
    console.log(this.token, this.user);
  }

  logout(): void {
    this.userService.logoutUser().subscribe(
      (res:any) => {      
        sessionStorage.removeItem("token");
        this.messagesService.postSuccessMessage("Successfully logged out!");
        window.location.href="/";
    }),
    (error:any) => {
      this.messagesService.postSuccessMessage(error.message.message);
    }
  }

  searchBook() {
    console.log("searching - ", this.searchTerm);
    if(this.searchTerm.length > 0) {
      this.searchActive = true;
    } else {
      this.searchActive = false;
    }
    this.booksService.searchBooks(this.searchTerm).subscribe(
      (response) => {
        this.searchBookMatch = response;
        console.log(response);
        
      },
      (error) => {}
    )
  }

}
