import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { IEmoji } from './iemoji';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {  
  emojiData: IEmoji[] = [
    {key: 0, value: 'em em-some-emoji'},
    {key: 1, value: 'em em---1'},
    {key: 2, value: 'em em--1'},
    {key: 3, value: 'em em-100'},
    {key: 4, value: 'em em-1234'},
    {key: 5, value: 'em em-blond-haired-man'},
    {key: 6, value: 'em em-blond-haired-woman'},
    {key: 7, value: 'em em-blossom'},
    {key: 8, value: 'em em-blowfish'},
    {key: 9, value: 'em em-blue_book'},
    {key: 10, value: 'em em-blue_car'},
    {key: 11, value: 'em em-blue_heart'},
    {key: 12, value: 'em em-blush'}
    
  ];  
  constructor(    
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any )
     { }
   
     ngOnInit(){     }

  onNoClick(): void {
    this.dialogRef.close();
  } 
  selectedEmoji(value) {        
    alert(value);
  }
}


