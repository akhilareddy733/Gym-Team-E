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
  shoppingPrice:any;
  gymMemberShipPay:any=true;
  addressDetails:any;
  
  paymentData_orderOrMem:any;

  constructor(private service:AllServicesService, private router:Router){
    this.paymentData=service.paymentData
    this.addressDetails=service.addressDetails
    console.log("addres details :", this.addressDetails)
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
          this.shoppingPrice=this.service.paymentData.price
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

    // if order payment 


    // if membership payment 
    if(localStorage.getItem("paymentStatus")=="true"){
      this.paymentData_orderOrMem = {
        "order":this.service.paymentData.order,
        "price":this.service.paymentData.price,
        "card_no":this.cardno,
        "subscription":"monthly",
        "expiry_date":this.expirtydate,
        "cvv":this.cvv
      }
    }
    else{
      this.paymentData_orderOrMem = {
        "price":this.price,
        "card_no":this.cardno,
        "subscription":"monthly",
        "expiry_date":this.expirtydate,
        "cvv":this.cvv
      }
    }
 
    this.service.paymentData=this.paymentData_orderOrMem;

    this.router.navigate(['/payment'])

    try{
      // order post api
      this.service.paymentCheckout(this.paymentData_orderOrMem, headers).subscribe(
        async (response)=>{
          this.loader=false;
          if(response){
            localStorage.setItem("paymentStatus", "true")
            alert(response.message)
            alert("Your payment id :" + " " + response.data.id)
            alert("Your order is successfull")
            this.loader=true;
            this.deleteAllCartItems();
            setTimeout(() => {
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }, 2000);
          }
        },(error)=>{
          console.log("error is:", error)
          alert(error.status + " " + error.statusText)
        }
      )
    }catch{

    }
  }

  // delete from cart
  deleteAllCartItems(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.deleAllAfterPayment(headers).subscribe(
      (response)=>{
        console.log(response)
        if(response){
          console.log(response)
        }else{
          this.loader=false
        }
      },(error)=>{
        this.loader=false
      }
    )
  }

  // save order history
  // saveOrdersToHistory(){
  //   this.loader = true;
  //   const key = localStorage.getItem("headers")
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${key}`
  //   });

  //   const orderData: any = {
  //     product: 4,  
  //   };
    
  //   this.service.saveOrdersToHistory(orderData, headers).subscribe(
  //     (response)=>{
  //       this.loader=false;
  //       if(response){
  //         this.loader=true;
  //         console.log("order saved to history", response)
  //       }
  //     },(error)=>{
  //       console.log("error is:", error)
  //       alert(error.status + " " + error.statusText)
  //     }
  //   )
  // }



}
