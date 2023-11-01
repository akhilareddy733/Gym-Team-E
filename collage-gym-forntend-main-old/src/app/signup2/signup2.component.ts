import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component {
  fullname:any=""
  username:any=""
  phoneno:any=""
  password1:any=""
  password2:any=""

  loader=false;
  subscriptionType: any="";
  subscriptionTypePayload: any="";

  constructor(private service:AllServicesService, private router:Router){}

  signup(){
    let data={
          "name":this.fullname,
          "phone_no":this.phoneno,
          "email":this.username,
          "password":this.password1,
          "gym_membership":this.subscriptionTypePayload
    };
    this.loader=true
    this.service.userRegistration(data).subscribe(
      (response)=>{
        if(response.id){
          alert("Registration successful")
          this.loader=false
          this.router.navigate(['/signin']);
        }
        this.loader=false
      },
      (error)=>{

        if(error.error.email==undefined){
          alert(error.error.phone_no)
        }
        else if(error.error.phone_no==undefined){
          alert(error.error.email)
        }
        else{
          alert(error.error.email + " \n " + error.error.phone_no)
        }
        window.location.reload();
        this.router.navigate(['/signup']);
        this.loader=false
      }
    );
    

  }

  subscriptionPlan(subscriptionTypeVal: any){
    this.subscriptionType=subscriptionTypeVal
    if(subscriptionTypeVal=='gymMemberShip'){
      this.subscriptionTypePayload=true
    }else{
      this.subscriptionTypePayload=false
    }
  }
}
