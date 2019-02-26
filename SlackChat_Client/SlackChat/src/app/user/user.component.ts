import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../login/authentication.service';
import { UserService } from './user.service';
import { AlertService } from '../shared/alert/alert.service';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';

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
@Component({
//   selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class UserComponent implements OnInit {
    userRegisterForm: FormGroup;
    loading = false;
    submitted = false;
    id:number; //user to get a vlue from routing
    
    toDay:string=moment(new Date()).format().substring(0, 10); 
    date = new FormControl(moment());

    @Input() user: 
  any = { 
        user_UserId:'',    
        user_UserName:'',    
        user_Password:'',
        user_Birthdate:'',
        user_UserStaus:0,          
    };
    birthDate:string;
    birthError:any={isError:false,errorMessage:''};
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,        
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {        
        this.userRegisterForm = this.formBuilder.group({          
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            birthDate:['', Validators.required],
        });
        if (this.id==0)
        {
          this.user.Birthdate= moment(Date.now()).format().substring(0, 10); 
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.userRegisterForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.userRegisterForm.invalid) {
            return;
        }

        this.loading = true;
        this.user.BirthDate = moment(this.user.Birthdate).format().substring(0, 10);         
        //  this.userService.addUser(this.userRegisterForm.value)
         this.userService.addUser(this.user)
            .pipe(first())
            .subscribe(
                data => {                    
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/Login']);
                },
                error => {                    
                    this.alertService.error(error);
                    this.loading = false;
                });

                 //Birthdate validation
        }        

validateBirthDate(){      
    this.birthDate = moment(this.userRegisterForm.controls['birthDate'].value).format().substring(0, 10); 
    if  (this.toDay==this.birthDate)
      this.birthError={isError:true,errorMessage:'Birthdate does not same with current date'};
    else if  ( this.birthDate > this.toDay )    
      this.birthError={isError:true,errorMessage:'Birthdate does not greater than current date'};        
    else     
      this.birthError={isError:false};    
  }  
}