import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  url = "https://gymproject-404a72ac42b8.herokuapp.com"

  paymentData:any;
  addressDetails:any ={};

  constructor(private http:HttpClient) { }

  userRegistration(data:any):Observable<any>{
    return this.http.post(`${this.url}/account/register/`, data);
  }

  userLogin(data:any):Observable<any>{
    return this.http.post(`${this.url}/account/login/`, data);
  }

  getProducts(headers:any):Observable<any>{
    return this.http.get(`${this.url}/ecomerce/product/`,  {headers});
  }

  addProduct(product:any, headers:any):Observable<any>{
    return this.http.post(`${this.url}/ecomerce/order/`, product, {headers});
  }

  getAllOrders(headers:any):Observable<any>{
    return this.http.get(`${this.url}/ecomerce/order/`, {headers});
  }

  deleteCartItem(productId:any, headers:any):Observable<any>{
    return this.http.delete(`${this.url}/ecomerce/order/${productId}`, {headers});
  }

  paymentCheckout(data:any, headers:any){
    return this.http.post<any>(`${this.url}/ecomerce/payment/`, data, {headers})
  }

  getPymentDetails(headers:any){
    return this.http.get<any>(`${this.url}/ecomerce/payment/`, {headers})
  }
  
  getDietPlans(params:any, headers:any){
    return this.http.get<any>(`${this.url}/gym/diet/`, {params, headers})
  }
  
  getVideoExcercise(headers:any){
    return this.http.get<any>(`${this.url}/gym/excerise/`, {headers})
  }
    
  getProfileDetails(headers:any){
    return this.http.get<any>(`${this.url}/account/profile/`, {headers})
  }
  
  updateProfile(data:any, headers:any){
    return this.http.put<any>(`${this.url}/account/update-profile/`, data, {headers})
  }

  getPaymentStatus(headers:any){
    return this.http.get<any>(`${this.url}/ecomerce/payment/`, {headers})
  }

  getProductDetails(headers:any, productid:any){
    return this.http.get<any>(`${this.url}/ecomerce/product/${productid}/`, {headers})
  }

  removeItems(headers:any, productid:any){
    return this.http.delete<any>(`${this.url}/ecomerce/order/${productid}/`, {headers})
  }

  deleAllAfterPayment(headers:any){
    return this.http.delete<any>(`${this.url}/ecomerce/order/`, {headers});
  }

  saveOrdersToHistory(data:any, headers:any){
    return this.http.post<any>(`${this.url}/ecomerce/order/`, data, {headers});
  }

  getOrderHistory(headers:any){
    return this.http.get<any>(`${this.url}/ecomerce/history/`, {headers});
  }
  
  saveAddressToUser(addressDetails:any, headers:any){
    return this.http.put<any>(`${this.url}/account/update-profile/`, addressDetails, {headers});
  }


  // get chat answers
    
  getChatAnswers(headers:any){
    return this.http.get<any>(`${this.url}/chatbot/chat/`, {headers});
  }




}
