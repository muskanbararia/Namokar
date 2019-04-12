import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  getToday(lat:any,lon:any,date:any):Observable<any>{
    var y=date.getFullYear();
    var m=date.getMonth();
    var d=date.getDate();
    date=y+"-"+m+"-"+d
    return this.http.get("https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon+"&date="+date).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  } 
}
