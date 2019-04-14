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
    m=parseInt(m)+1
    var d=date.getDate();
    date=y+"-"+m+"-"+d
    var a= this.http.get("https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon+"&date="+date).pipe(catchError(this.errorHandler));
    //alert(a)
    return a;
  }
  getLatLon(location:string):Observable<any>{
    return this.http.get("https://us1.locationiq.com/v1/search.php?key=4623cb06915ada&q="+location+"&format=json").pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  } 
}
