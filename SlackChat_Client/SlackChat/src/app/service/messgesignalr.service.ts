import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Messagedetail } from '../messagedetail/messagedetail';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { currentId } from 'async_hooks';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';

const moment = _rollupMoment || _moment;
	export const MY_FORMATS = {
	  parse: {
		dateInput: 'LL',
	  },
	  display: {
		dateInput: 'LL',
		dateA11yLabel: 'LL',
		monthYearLabel: 'MMM YYYY',
		monthYearA11yLabel: 'MMMM YYYY',
	  },
	};
@Injectable({
  providedIn: 'root'
})
export class MessageSignalRService {

  public data: Messagedetail[];
  public msgData: any;
  public recMsgData: any;
  public bradcastedData: Messagedetail[];
  
  private hubConnection: signalR.HubConnection
  uCnt:number=0;
  rCnt:number=0;

  public startConnection = () => {    
    this.hubConnection = new signalR.HubConnectionBuilder()                            
                            .withUrl('https://localhost:44302/messagedetails')
                            .build(); 
    this.hubConnection
      .start()
      .then(() => console.log('Message Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
// --------------
  public addTransferMessageDataListener = (cUserId,rUserId) => {      
    this.hubConnection.on('transfermessagedata', (data) => {      
      this.data = data;          
      this.recMsgData=[];
       this.msgData =[];                    
    
       if  (this.data.length>0 )     
      { 
      //show date wise data    
        this.data.forEach(item => {
          if  (item.userId==cUserId && item.rUserId==rUserId
            ||  item.userId == rUserId &&  item.rUserId == cUserId )
            {                      
                item.dateTime= item.date;                
                // item.tempdate= item.date;                
                item.tempdate= moment(item.date).format().substring(0, 10);    //dd-mm-yyyy
                this.msgData.push(item);               
            } 
      });   
    //group by date to show date wise data
      const groupedObj = this.msgData.reduce((prev, cur)=> {        
        if(!prev[cur["tempdate"]]) {
            prev[cur["tempdate"]] = [cur];
        } else {
            prev[cur["tempdate"]].push(cur);
        }
        return prev;
      }, {});           
      this.msgData= Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));

      // ----------------notification
      // this.recMsgData = this.data.filter(item => item ==cUserId ||item.rUserId ==cUserId  );

      const groupedKey = this.data.reduce((prev, cur)=> {
        if(!prev[cur["userId"]]) {
            prev[cur["userId"]] = [cur];
        } else {
            prev[cur["userId"]].push(cur);
        }
        return prev;
      }, {});             

      this.recMsgData= Object.keys(groupedKey).map(key => ({ key, value: groupedKey[key] ,unCount:0 }));        

      // Notification count setting 
      this.recMsgData.forEach(item => {        
        item.value.forEach(ele => {            
          if  (ele.msgStatus==0) 
          {
            this.uCnt++;              
          }            
        });         
          item.unCount=this.uCnt;
          this.uCnt=0;                    
        });               
      }  
    });
  }  

  public broadcastMessageData = () => {
    this.hubConnection.invoke('broadcastmessagedata', this.data)
    .catch(err => console.error(err));
  }
 
  public addBroadcastMessageDataListener = () => {    
    this.hubConnection.on('broadcastmessagedata', (data) => {
      this.bradcastedData = data;             
    })
  }
}