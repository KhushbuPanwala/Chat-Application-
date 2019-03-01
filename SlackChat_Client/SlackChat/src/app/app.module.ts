import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { fakeBackendProvider } from './helper/fake-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AlertComponent } from './shared/alert/alert.component';
import { MatDatepickerModule, MatDialogModule } from '@angular/material';
import { DialogComponent } from './shared/dialog/dialog.component';
// import { GroupByPipe } from './group-by.pipe';



const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },    
  { path: 'Login', component: LoginComponent },
  { path: 'User', component: UserComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,    
    LoginComponent,
    UserComponent,
    AlertComponent,
    DialogComponent
    // GroupByPipe,
    
  ],
  entryComponents: [
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,                
    FormsModule,  
    RouterModule.forRoot(appRoutes),      
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider        
],

  bootstrap: [AppComponent]
})
export class AppModule { }