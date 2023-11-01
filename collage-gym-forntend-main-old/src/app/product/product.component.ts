import { Component, ElementRef, Input } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() characterLimit: number = 50;

  products:any;
  loader:any=false;
  successMsg:any;
  noOfItemsInCart:any;
  allOrders:any;
  address:any;
  addresspincode:any;


  constructor(private service:AllServicesService,
    private router:Router,
    private el: ElementRef){
      
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.getProducts();
    }
    else{
      router.navigate(["/"]);
    }
  }

  ngOnInit(){
    
  }


  getProducts(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.getProducts(headers).subscribe(
      (response)=>{
        this.loader=false;
        this.products = response;
        console.log("all products :", this.products)

        if(response.id){
          this.products = response
        }
      },(error)=>{
        alert(error.status + " " + error.statusText )
      }
    )
  }


  getAddressDetails(){
    if(this.address=="" || this.address==null || this.address==undefined){
      this.address = prompt("Please enter delivery address")
      if(this.address!="" && (this.addresspincode=="" || this.addresspincode==null || this.addresspincode==undefined)){
        this.addresspincode = prompt("Please enter delivery pincode")
      }
    }
    localStorage.removeItem("address")
    localStorage.removeItem("pincode")
    localStorage.setItem("address", this.address)
    localStorage.setItem("pincode", this.addresspincode)
  }


  addProduct(itemId:any){

    if(localStorage.getItem("address")=="" || localStorage.getItem("pincode")=="" || localStorage.getItem("address")==null || localStorage.getItem("pincode")==null || localStorage.getItem("pincode")=="undefined" || localStorage.getItem("address")=="undefined" ){
      this.getAddressDetails()
    }

    console.log("itme id :", itemId)
    this.loader=true
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const product_id = {
        "product": itemId,
        "delivery_address":"address",
        "delivery_address_pincode":110045
    }

    this.service.addProduct(product_id, headers).subscribe(
      (response)=>{
        if(response.message){
          console.log('response', response)
          this.successMsg=true
          this.loader=false
        }
        this.loader=false
        setTimeout(() => {
          this.successMsg=""
        }, 3000);
      },
      (error)=>{
        console.log('error :', error)
        if(error){
          alert(error.status + " " + error.statusText)
        }
        
        window.location.reload();
        this.loader=false
      }
    );
    
    console.log("loader :", this.loader);
  }


}
