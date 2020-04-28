import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, retry} from 'rxjs/internal/operators';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
baseUrl: string = "http://localhost:3200/";
testCookieValue: string;
jsonWenToken: string;
msgs: any;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'authorization': this.cookieService.get('jsonWebToken')
  })
};

  constructor(private http: HttpClient, private cookieService: CookieService) {
   
   }

   setHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': this.cookieService.get('jsonWebToken')
      })
    };
   }

  getService(url: string):Observable<any> {
    this.setHeaders();
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError),
      retry(3)
      );
  }


  postService(url: string, filterConditions: any): Observable<any> {
    let body = JSON.stringify(filterConditions);
    return this.http.post(url, body, this.httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError)
          );
  }

  deleteService(url: string): Observable<any> {
      return this.http.delete(url, this.httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  patchService(url: string, userData: any) {
      let body = JSON.stringify(userData);
      return this.http.patch(url, body, this.httpOptions).pipe(
        map(this.extractData),
          catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
      let body = res;
      return body || {};
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return throwError(errMsg);
  }
  
}


