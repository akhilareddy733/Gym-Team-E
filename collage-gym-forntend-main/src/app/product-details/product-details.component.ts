import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AllServicesService } from '../service/all-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productDetails:any;
  loader:any=false;
  successMsg:any;
  noOfItemsInCart:any;
  allOrders:any;
  productId:any;

  constructor(private route: ActivatedRoute, private router:Router, private service:AllServicesService){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.getProductDetails();
    }
    else{
      router.navigate(["/"]);
    }
  }

  getProductDetails(){
    this.route.paramMap.subscribe((params:ParamMap) =>{
      this.productId=params.get("productid");
    })
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.getProductDetails(headers, this.productId).subscribe(
      (response)=>{
        this.loader=false;
        this.productDetails = response;
        console.log(response)
        if(response.id){
          this.productDetails = response
        }
      },(error)=>{
        alert(error.status + " " + error.statusText )
      }
    )
  }

  addProduct(itemId:any){
    
    this.loader=true
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    const product_id = {
        "product": itemId,
    }
     
    this.service.addProduct(product_id, headers).subscribe(
      (response)=>{
        if(response.message){
          this.successMsg=true
          this.loader=false
          this.successAlert();
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

  successAlert(){
    Swal.fire({
      title: 'Product Added To Cart',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }



}
