import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersignalrService {
  public data: User[];
  public allUser: any;
  public bradcastedData: User[];
  
  private hubConnection: signalR.HubConnection

  constructor(private  userService:UserService){
  }  


  public startConnection = () => {         
    this.hubConnection = new signalR.HubConnectionBuilder()                            
                            .withUrl('https://localhost:44302/users')
                            .build();     
    this.hubConnection
      .start()
      .then(() => console.log('User hub Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
    public addTransferUserDataListener = () => {
      this.allUser = [];     
      this.userService.getAllUser().subscribe(
        user => {
          this.allUser = user;              
        });
      this.hubConnection.on('transferuserdata', (data) => {            
          this.data = this.allUser;        
        });
  }  
   
  public broadcastUserData = () => {            
     this.hubConnection.invoke('broadcastuserdata', this.data)
    .catch(err => console.error(err));
  }
 
  public addBroadcastUserDataListener = () => {       
    this.hubConnection.on('broadcastuserdata', (data) => {
      this.bradcastedData = data;
    })
  }
}