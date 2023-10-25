import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentData:any;
  loader:any;
  cardno:any;
  cvv:any;
  amount:any;
  expirtydate:any;
  price:any=100;
  gymMemberShipPay:any=true;

  constructor(private service:AllServicesService, private router:Router){
    this.paymentData=service.paymentData
  }

  ngOnInit(){
    console.log("payment data :", this.paymentData);
    if(localStorage.getItem("paymentStatus")!="true"){
      this.gymMemberShipPay=true;
      console.log("membership payment")
      this.meemberShipPaymentStatus();
    }
    else if((localStorage.getItem("productOrderPayment")=="true" && localStorage.getItem("paymentStatus")=="true")){
      this.gymMemberShipPay=false;
      console.log("product payment") 
      // this.productOrderPaymentStatus();
      
      if(this.paymentData!=null || this.paymentData!=undefined || this.paymentData!=""){
        this.amount=this.paymentData.price
      }
    }
    else{
      this.router.navigate(['/home'])
    }
  }

  // productOrderPaymentStatus(){
  //   this.loader = true;
  //   const key = localStorage.getItem("headers")
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${key}`
  //   });
    
  //   if(localStorage.getItem("productOrderPayment")=="false"){
  //     this.router.navigate(['/home']).then(() => {
  //       window.location.reload();
  //     });
  //   }
  //   else{
  //     this.router.navigate(['/product'])
  //   }
  // }

  meemberShipPaymentStatus(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    

    this.service.getPaymentStatus(headers).subscribe(
      (response)=>{
        this.loader=false;
        if(response){
          if(response[0].status){
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }
          else{
            this.router.navigate(['/payment']).then(() => {
              window.location.reload();
            });
          }
        }
      },(error)=>{
        console.log("error is:", error)
        alert(error.status + " " + error.statusText)
      }
    )
  }


  getPaymentDetails(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const data = {
      // "order": this.orderId,
      // "subscription": "",
      // "price": this.totalPrice
    }

    
    this.service.getPymentDetails(headers).subscribe(
      (response)=>{
        this.loader=false;
        if(response){
          this.price=this.service.paymentData.price
        }
      },(error)=>{
        alert(error.status + " " + error.statusText)
      }
    )
  }

  makePayment(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const data = {
      "price":this.price,
      "card_no":this.cardno,
      "subscription":"monthly",
      "expiry_date":null,
      "cvv":this.cvv
    }
    
    this.service.paymentData=data;

    this.router.navigate(['/payment'])

    this.service.paymentCheckout(data, headers).subscribe(
      (response)=>{
        this.loader=false;
        if(response){
          localStorage.setItem("paymentStatus", "true")
          console.log("response is ", response)
          alert(response.message)
          alert("Your payment id :" + " " + response.data.id)
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      },(error)=>{
        console.log("error is:", error)
        alert(error.status + " " + error.statusText)
      }
    )
  }

}