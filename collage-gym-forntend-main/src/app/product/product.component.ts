import { Component, ElementRef, Input } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  address:any="";
  validAddress: any=false;


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

    this.address = prompt("Please enter delivery address")

    if(this.address=="" || this.address==null || this.address=="undefined"){
      // this.addressDetailArePresent=false;
      this.AlertMsg("Please enter a valid address and pincode", 'error')
      this.constructor();
    }
    localStorage.setItem("address", this.address)
  }


  async addProduct(itemId:any){

    console.log("address local :", localStorage.getItem("address"))

    if(localStorage.getItem("address")=="" || localStorage.getItem("address")=="null"  || localStorage.getItem("address")=="undefined" || localStorage.getItem("address")==null || localStorage.getItem("address")==undefined){
      await this.inputPrompt1("msg")
    }

    // if(this.validAddress!=false){
    //   this.AlertMsg("Please enter a valid address and pincode", 'error')
    //   this.constructor();
    // }

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
          this.AlertMsg("Product Added To Cart", 'success');
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


  AlertMsg(msg:any, icontype:any){
    Swal.fire({
      title: msg,
      icon: icontype,
      confirmButtonText: 'OK'
    });
  }


  inputPrompt(msg:any){
    let val = this.inputPrompt1("some msg")
    console.log("val :",val)
  }

  async inputPrompt1(msg:any) {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Enter your address',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    });
  
    if (!text) {
      this.AlertMsg("Please enter a valid address", "info");
      this.constructor();
    }
    localStorage.setItem("address", text)
    console.log("msg :", text)
    return text;
    
  }
  


}


