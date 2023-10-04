import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  fullname=""
  username=""
  phoneno=""
  password1=""
  password2=""

  loader=false;

  constructor(private service:AllServicesService, private router:Router){}

  signup(){
    console.log("loader :", this.loader);
    let data={
      "name":this.fullname,
      "phone_no":this.phoneno,
      "email":this.username,
      "password":this.password1,
    };
    this.loader=true
    console.log("loader :", this.loader);
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
        console.log(error.message)
        
        if(error.error.email==undefined){
          alert(error.error.phone_no)
        }
        else if(error.error.phone_no==undefined){
          alert(error.error.email)
        }
        else{
          alert(error.error.email + " \n " + error.error.phone_no)
          console.log(error)
        }
        this.loader=false
      }
    );
    

  }

}
