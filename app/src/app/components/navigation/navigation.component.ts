import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  token:any;
  user:any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
      this.user = jwtDecode(this.token);
    }
    console.log(this.token, this.user);
  }

  logout(): void {
    this.userService.logoutUser().subscribe((res:any) => {
      console.log(res);
      
      if(res[1] !== 401) {
        console.log("Hello world");
        sessionStorage.removeItem("token");
        window.location.href="/";
      }
    })
  }

}
