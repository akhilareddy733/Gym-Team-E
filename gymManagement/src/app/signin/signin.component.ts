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
          this.userLoggedIn = true;
          localStorage.setItem("isUserLoggedIn","true");
          this.router.navigate(['/profile']).then(()=>{
            window.location.reload();
          });
          this.loader=false
        },
        (error)=>{
          alert(error.error.detail)
          window.location.reload();
          this.router.navigate(['/signin']);
          this.loader=false
        }
      )
    }
  }



}
