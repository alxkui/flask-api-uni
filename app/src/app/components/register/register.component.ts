import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private userService: UserService) { }

  onSubmit() {
    if(!this.name) { alert("Please insert your username"); return }
    if(!this.email) { alert("Please insert your email"); return }
    if(!this.password) { alert("Please insert your password"); return }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
    }

    this.userService.registerUser(newUser).subscribe(
      (response) => {
        this.successMessage = response.message;
        window.location.href = '/login';
      },
      (error) => this.errorMessage = error.error.message,
    );

    this.name = '';
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

}
