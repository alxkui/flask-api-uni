import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string = '';
  password:string = '';

  constructor(private userService: UserService) { }

  onSubmit() {
    if(!this.email) { alert("Please enter your email"); return }
    if(!this.password) { alert("Please enter your password"); return }

    const loginDetails = {
      email: this.email,
      password: this.password,
    }

    this.userService.loginUser(loginDetails).subscribe(data => {
      localStorage.setItem('session_token', data.token);
      console.log(data);
    });
    alert("User logged in");

    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {
  }

}
