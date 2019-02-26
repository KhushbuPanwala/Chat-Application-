import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://localhost:44302/api/Users';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {                 
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

addUser (user): Observable<any> {              
  return this.http.post(endpoint , JSON.stringify(user), httpOptions)
  .pipe(
  catchError(this.handleError<any>('addUser')));
}

deleteUser (id): Observable<any> {          
  return this.http.delete(endpoint+ "/" + id).pipe(  
    map(this.extractData));                    
}

updateUser (id): Observable<any> {    
  // let id=user.userId;
  // return this.http.put(endpoint + '/' + id, JSON.stringify(user), httpOptions).pipe(
    return this.http.put(endpoint + '/' + id, httpOptions).pipe(
  catchError(this.handleError<any>('updateUser'))
);          
}
getAllUser(): Observable<any> {   
  return this.http.get(endpoint).pipe(  
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