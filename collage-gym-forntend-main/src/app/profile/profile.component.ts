import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  profileDetails:any;
  loader:any=false;

  constructor(private service:AllServicesService,
    private router:Router){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.getProfileDetails();
    }
    else{
      this.router.navigate(['/'])
    }
  }


  // automatically called
  getProfileDetails(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.getProfileDetails(headers).subscribe(
      (response)=>{
        this.loader=false;
        this.profileDetails = response;
        console.log(response);
        if(response.id){
          // this.products = response
        }
      },(error)=>{
        alert(error.status + " " + error.statusText )
      }
    )
  }




}
