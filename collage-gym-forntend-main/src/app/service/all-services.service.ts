import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  url = "https://gymproject-404a72ac42b8.herokuapp.com"

  constructor(private http:HttpClient) { }

  userRegistration(data:any):Observable<any>{
    return this.http.post(`${this.url}/account/register/`, data);
  }

  userLogin(data:any):Observable<any>{
    return this.http.post(`${this.url}/account/login/`, data);
  }

}
