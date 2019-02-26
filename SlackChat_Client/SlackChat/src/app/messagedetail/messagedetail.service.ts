import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Messagedetail } from './messagedetail';

const endpoint = 'https://localhost:44302/api/Messagedetails';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessagedetailService {
//signalR
public data: Messagedetail[];
  //code
  constructor(private http: HttpClient) {                 
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

sendMessage (message): Observable<any> {              
  return this.http.post(endpoint , JSON.stringify(message), httpOptions)
  .pipe(
  catchError(this.handleError<any>('sendMessage')));
}

getAllMessage(): Observable<any> {           
  return this.http.get(endpoint).pipe(  
    map(this.extractData));
 } 
 getMessage(id): Observable<any> {         
  return this.http.get(endpoint +'/'+  id).pipe(          
    map(this.extractData));
}

   
// updateMessage (id, message): Observable<any> {
  updateMessage (id): Observable<any> {        
    return this.http.get(endpoint +'/'+  id).pipe(          
      map(this.extractData));        
}
private handleError<T> (operation = 'operation', result?: T) {
return (error: any): Observable<T> => {        
// TODO: send the error to remote logging infrastructure
console.error(error); // log to console instead

// TODO: better job of transforming error for user consumption
console.log('${operation} failed: ${error.message}');

// Let the app keep running by returning an empty result.
return of(result as T);
};
}
}