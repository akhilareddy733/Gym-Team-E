import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllServicesService } from '../service/all-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  isUserLoggedIn=false;
  isUserMembership=false;
  products:any;
  loader:any=false;
  successMsg:any;
  noOfItemsInCart:any;
  allOrders:any;
  paymentStatus:any=false;
  location:any="";
  currentLocation:any;

  constructor(private router: Router, private service:AllServicesService){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.isUserLoggedIn=true;
      this.currentLocation=window.location.pathname
      console.log("location :", this.currentLocation)
    }
    if(localStorage.getItem("gymMembership")=="true"){
      this.isUserMembership=true;
    }if(localStorage.getItem("paymentStatus")=="true"){
      this.paymentStatus=true
    }
    this.location=window.location.pathname
    console.log(this.location + " location ")
  }

  ngOnInit(): void {
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    let CUserId=localStorage.getItem('currentUserId')
    if (CUserId){
      this.service.getAllOrders(headers).subscribe((data:any)=>{
        if(data){
          this.noOfItemsInCart=data.length;
        }
      })
    }
    
  }

  
  signout(){
    console.log("from logged out"); 
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("headers")
    localStorage.removeItem("gymMembership");
    localStorage.removeItem("paymentStatus");
    localStorage.removeItem("productOrderPayment");
    localStorage.removeItem("address");
    
    this.router.navigate(['/home'])
    window.location.reload();
  }



  
  

}
