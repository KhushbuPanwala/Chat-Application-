import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../user/user';
import { AuthenticationService } from '../login/authentication.service';
import { AlertService } from '../shared/alert/alert.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MessagedetailService } from '../messagedetail/messagedetail.service';
import { UserService } from '../user/user.service';
import { Messagedetail } from '../messagedetail/messagedetail';
import { UsersignalrService } from '../service/usersignalr.service';
import { MessageSignalRService } from '../service/messgesignalr.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';
// import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{    
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[];
    messages:any[];    
     message:string="";
     sendMessage:Messagedetail;
     updateMessage:Messagedetail;

    //coding variable
    currentUserId:number=0;    
    recivedUserId:number=0 ;
    messageForm: FormGroup;    
  // private currentUserSubject: BehaviorSubject<User>;
  
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService:AlertService,
        private formBuilder: FormBuilder,        
        private http: HttpClient,        
        private userService:UserService,
        private messagedetailService:MessagedetailService,        
        public signalRService: UsersignalrService,    
        public msgSignalRService: MessageSignalRService,
        private dialog: MatDialog,     
    ) {
     
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;                               
            this.currentUserId=this.currentUser.userId;
        });        
    }
    ngOnInit() {       
      
      //user                 
      this.signalRService.startConnection();            
      this.signalRService.addTransferUserDataListener();
      this.signalRService.addBroadcastUserDataListener();             
      this.startHttpRequest();

      //message      
      this.msgSignalRService.startConnection();            
       this.msgSignalRService.addTransferMessageListener(this.currentUserId,this.recivedUserId);
      this.msgSignalRService.addBroadcastMessageDataListener();  
      this.startMsgHttpRequest(); 
      
      // this.loadAllUsers();
        this.messageForm = this.formBuilder.group({
            message: [''],
        });                   
      }
      
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    private startMsgHttpRequest = () => {      
      this.http.get('https://localhost:44302/api/messagedetails')
        .subscribe(res => {
          // console.log(res);
        })
    }
    private startHttpRequest = () => {    
      this.http.get('https://localhost:44302/api/users')
      .subscribe(res => {      
          // console.log(res);
        })
    }
     
      loadData(cUserId, rUserId){             
        this.currentUserId = cUserId;
        this.recivedUserId = rUserId;                  
         this.msgSignalRService.addTransferMessageListener(this.currentUserId,this.recivedUserId);
        console.log("load data called");
        //update messagedetail table set unread to read 
        let id=this.currentUserId+";"+this.recivedUserId;        
        this.messagedetailService.updateMessage(id).
            pipe(first()).subscribe(msgs => {      
              this.alertService.success('Record updated successfully!!!', true);               
            });  
        }

      sendMessageData()
      {
        this.sendMessage =this.messageForm.value;
        this.sendMessage.userId =this.currentUserId;
        this.sendMessage.rUserId= this.recivedUserId; 
        this.sendMessage.msgStatus=0;        

        this.messagedetailService.sendMessage(this.sendMessage).pipe(first())
        .subscribe(msgs => {      
          this.alertService.success('Record send successfully!!!', true);          
          this.currentUserId=this.sendMessage.userId;
          this.recivedUserId= this.sendMessage.rUserId;     
           this.msgSignalRService.addTransferMessageListener(this.currentUserId,this.recivedUserId);                    
        });            
          this.messageForm = this.formBuilder.group({
            message: [''],
        });         
      }
        onKeyPress(event: any) {               
           if  (event.keyCode==13) {
                this.sendMessageData();
           }
        };
  
    showHome()
    {
      this.recivedUserId=0;
    }
      logout(userId) {
        this.userService.updateUser(userId).pipe() .subscribe( data => { }); 
        this.authenticationService.logout();  
        this.router.navigate(['/Login']);        
    }


    
 openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px' ,      
      data: {
        // dataKey: id,
        // deletionModule:'Employee',
      }
    });
    dialogRef.afterClosed().subscribe(result => {      
      // this.getEmployees();
    });
  }

}