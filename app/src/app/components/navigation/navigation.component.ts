import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
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

  constructor(private userService: UserService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
      this.user = jwtDecode(this.token);
    }
    console.log(this.token, this.user);
  }

  logout(): void {
    this.userService.logoutUser().subscribe((res:any) => {      
      if(res[1] !== 401) {
        sessionStorage.removeItem("token");
        this.messagesService.postSuccessMessage("Successfully logged out!");
        window.location.href="/";
      }
    })
  }

}
