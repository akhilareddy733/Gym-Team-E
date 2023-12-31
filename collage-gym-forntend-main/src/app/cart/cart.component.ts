import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllServicesService } from '../service/all-services.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  loader:any=false;
  successMsg:any;
  noOfItemsInCart:any;
  allOrders:any;
  totalPrice:any=0;
  deliveryDetails:any;
  orderNo: any;
  paymentDetails:any="";
  orderId: any="";
  cartEmpty:any=true; 


  addressline1:any;
  addressline2:any;
  state:any;
  city:any;
  country:any;
  pincode:any;


  address:any;
  addresspincode:any;

  constructor(private service:AllServicesService,
    private router:Router,
    private activatedRoute: ActivatedRoute){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.getOrders();
      this.getAddressDetails()
    }
    else{
      router.navigate(['/']);
    }
  }

  getAddressDetails(){
    
    this.loader = true;

    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    this.service.getProfileDetails(headers).subscribe(
      (response)=>{
        this.loader=false;
        console.log("profile details :", response)
        if(response){
          this.addressline1=response.delivery_address,
          this.country=response.country,
          this.city=response.city,
          this.state=response.state,
          this.pincode=response.delivery_address_pincode
        }
      },(error)=>{
        alert(error.status + " " + error.statusText)
      }
    )
  }

  // get orders to display
  getOrders(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.getAllOrders(headers).subscribe(
      (response)=>{
        this.noOfItemsInCart = response.length
        if(response[0]){
          this.loader=false;
          this.allOrders = response;
          console.log("orders :" + JSON.stringify(this.allOrders));

          console.log(response[0])
          this.getAddressDetails();

          this.orderId=response[0].id
          this.noOfItemsInCart=response.length;
          this.deliveryDetails=response[0].user
          this.cartEmpty=false;
          this.allOrders = response
          this.getTotalPrice(response);
          this.getPaymentDetails();
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

  addAddressToUser(){
    this.loader = true;

    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const addressData={
      delivery_address:this.addressline1,
      delivery_address_pincode:this.pincode,
      country:this.country,
      state:this.state,
      city:this.city,
    }

    this.service.saveAddressToUser(addressData, headers).subscribe(
      (response)=>{
        this.loader=false;
        console.log(response)
        if(response){
          this.paymentCheckout()
        }
      },(error)=>{
        alert(error.status + " " + error.statusText)
      }
    )
  }

  // calling payment page
  paymentCheckout(){
    this.loader = true;

    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const data = {
      "order":this.orderId,
      "price":this.totalPrice,
      "subscription":""
    }
    
    this.service.paymentData=data;

    localStorage.setItem("productOrderPayment", "true");

    this.router.navigate(['/payment'])

    // this.service.paymentCheckout(data, headers).subscribe(
    //   (response)=>{
    //     this.loader=false;
    //     if(response){
    //       alert(response.message)
    //       alert("Your payment id :" + " " + response.data.id)
    //       window.location.reload();
    //     }
    //   },(error)=>{
    //     alert(error.status + " " + error.statusText)
    //   }
    // )
  }

  getPaymentDetails(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const data = {
      "order": this.orderId,
      "subscription": "",
      "price": this.totalPrice
    }

    
    this.service.getPymentDetails(headers).subscribe(
      (response)=>{
        this.loader=false;
        if(response){
          this.paymentDetails=response
        }
      },(error)=>{
        alert(error.status + " " + error.statusText)
      }
    )
  }

  removeItem(productid:any, price:any){
    console.log("product id :", productid)
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    this.service.removeItems(headers, productid).subscribe(
      (response)=>{
        this.loader=false;
        console.log("response", response)
        if(response.message){
          this.totalPrice=this.totalPrice-price
          alert(response.message)
          window.location.reload()
          if(this.noOfItemsInCart==1){
            window.location.reload();
          }
          this.getOrders()
        }
      },(error)=>{
        alert(error.status + " " + error.statusText)
      }
    )
  }

}
