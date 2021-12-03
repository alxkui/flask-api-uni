import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private messagesService: MessagesService) { }

  onSubmit() {
    if (!this.email) { alert("Please enter your email"); return }
    if (!this.password) { alert("Please enter your password"); return }

    const loginDetails = {
      email: this.email,
      password: this.password,
    }

    this.userService.loginUser(loginDetails)
      .subscribe(
        (response) => {
          sessionStorage.setItem('token', response.token);
          this.messagesService.postSuccessMessage(response.message);
          window.location.href = "/";
        },
        (error) => {
          console.log(error);
          this.messagesService.postErrorMessage(error.error.message);
        }
    );

    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {
  }

}
