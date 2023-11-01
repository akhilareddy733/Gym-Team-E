import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {


  username: string="";
  password: string="";
  loader: boolean = false;
  userLoggedIn=false;

  constructor(private service:AllServicesService, private router:Router){
    if(localStorage.getItem("userLoggedIn")=="true"){
      
    }
  }

  signin(){
    this.loader=true;
    let data={
      'email':this.username,
      'password':this.password
    }
    if(this.username!=null && this.username!==null && this.username!="" && this.username!=""){
      this.service.userLogin(data).subscribe(
        (response)=>{
          if(response.tokens.payment_status==true){
            localStorage.setItem("paymentStatus", "true");
          }
          else{
            localStorage.setItem("paymentStatus", "false");
          }
          console.log("response", response)
          this.userLoggedIn = true;
          localStorage.setItem("isUserLoggedIn","true");
          localStorage.setItem("headers", response.tokens.access)
          this.loader=true
          if(response.tokens.gym_membership){
               localStorage.setItem("gymMembership", 'true')
            this.router.navigate(['/payment']).then(()=>{
              window.location.reload();
            });
          }else if(response.tokens.gym_membership){
               localStorage.setItem("gymMembership", 'false')
            this.router.navigate(['/profile']).then(()=>{
              window.location.reload();
            });
          }
          else{
               localStorage.setItem("gymMembership", 'false')
            this.router.navigate(['/profile']).then(()=>{
              window.location.reload();
            });
          }
          
          this.loader=false
        },
        (error)=>{
          if(error.details){
            alert(error.error.details)
          }
          if(error.error.password){
            alert(JSON.stringify(error.error.password[0]))
          }
          if(error.error.detail){
            alert(error.error.detail)
          }
          window.location.reload();
          this.router.navigate(['/signin']);
          this.loader=false
        }
      )
    }
  }



}