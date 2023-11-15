import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  loader:any=false;
  allOrdersHistory:any;
  orderId: any="";
  orderHistoryEmpty:any=true; 

  address:any;
  addresspincode:any;
  totalPrice: any;

  constructor(private service: AllServicesService){
    this.getOrders();
  }

  getOrders(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.getOrderHistory(headers).subscribe(
      (response)=>{
        // this.noOfItemsInCart = response.length
        if(response[0]){
          this.loader=false;
          this.allOrdersHistory = response;
          console.log("orders :" + JSON.stringify(this.allOrdersHistory));
          console.log(response[0])
          this.orderHistoryEmpty=false;
          this.getTotalPrice(response);
        }else{
          this.loader=false
        }
      },(error)=>{
        this.loader=false
      }
    )
  }


  getTotalPrice(response:any){
    if(response!=null || response.length>=1){
      response.forEach((element: any) => {
        this.totalPrice=this.totalPrice + element.product.price
      });
    }
  }


}



