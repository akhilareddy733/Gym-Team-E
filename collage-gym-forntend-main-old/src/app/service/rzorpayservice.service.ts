import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

function _window() : any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class RzorpayserviceService {


  url = "https://gymproject-404a72ac42b8.herokuapp.com"
  cUserId=localStorage.getItem("currentUserId");

  constructor(public http: HttpClient) { }

  get nativeWindow() : any {
    return _window();
  }

  payWithRzorpay(id:any): any {
    return this.http.get(`${this.url}/razorpayment/${id}/${"PAY"}/`)
  }

  saveAndDeleteCartItems(id:any, rzrpay_order_id:any):any{
    return this.http.get(`${this.url}/razorpayment/${id}/${"SAVEPAYMENTDETAILS"}/${rzrpay_order_id}/`)
  }


}
