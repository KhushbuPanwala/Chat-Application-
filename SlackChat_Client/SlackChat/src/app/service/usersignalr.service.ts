import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class UsersignalrService {
  public data: User[];
  public bradcastedData: User[];
  
  private hubConnection: signalR.HubConnection
 
  public startConnection = () => {         
    this.hubConnection = new signalR.HubConnectionBuilder()                            
                            .withUrl('https://localhost:44302/users')
                            .build();     
    this.hubConnection
      .start()
      .then(() => console.log('User hub Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  // public addTransferUserDataListener = () => {        
    public addTransferUserDataListener = () => {        
    this.hubConnection.on('transferuserdata', (data) => {
      this.data = data;             
      // console.log(data);
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