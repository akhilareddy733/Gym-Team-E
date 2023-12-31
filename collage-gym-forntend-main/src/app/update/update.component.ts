import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  

  
  profileDetails:any="";
  loader:any=false;
  fullname:any=""
  username:any=""
  phoneno:any=""


  constructor(private service:AllServicesService,
    private router:Router){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.getProfileDetails();
    }
    else{
      this.router.navigate(['/'])
    }
  }


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
        console.log("get profile :", this.profileDetails)
        if(response){
          this.fullname=response.name
          this.username=response.email
          this.phoneno=response.phone_no
        }
        this.loader=false;
      },(error)=>{
        alert(error.status + " " + error.statusText )
        this.loader=false;
      }
    )
  }


  updateProfile(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    let userNewData = {
      "email": this.username,
      "phone_no": this.phoneno,
      "name": this.fullname
    }
    this.service.updateProfile(userNewData, headers).subscribe(
      (response)=>{
        this.loader=false;
        this.profileDetails = response;
        localStorage.setItem('userid', this.profileDetails.id)
        console.log("response is :",response);
        if(response.id){
          alert("Profile details updated successfully")
          this.router.navigate(['/profile']);
        }
      },(error)=>{
        console.log(error);
        console.log(error.error.phone_no)
        if(error.error.phone_no){
          alert(error.error.phone_no)
        }
        else if(error.error.email){
          alert(error.error.email)
        }
        else{ 
          alert(error.statusText)
        }
        
        this.loader=false;
      }
    )

    
  }

}
