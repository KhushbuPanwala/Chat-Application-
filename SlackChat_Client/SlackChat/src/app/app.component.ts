import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './login/authentication.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Slack Chat';
  currentUser: User;  

  constructor(    
    private http: HttpClient,
    private authenticationService: AuthenticationService )
    {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }  

  ngOnInit() {
  }
}
