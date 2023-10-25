import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {


  
  
  videoExcersiseDetails:any;
  loader:any=false;

  constructor(private service:AllServicesService,
    private router:Router){
    if(localStorage.getItem("isUserLoggedIn")=="true" && localStorage.getItem("gymMembership")=="true"){
      this.getVideoExcercise();
    }
    else{
      console.log("from video else")
      // this.router.navigate([{ outlets: { outletName: null } }]).then(() => {
      //   this.router.navigate([{ outlets: { outletName: '/home' } }]);
      // });
    }
  }


  getVideoExcercise(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });
    
    this.service.getVideoExcercise(headers).subscribe(
      (response)=>{
        this.loader=false;
        this.videoExcersiseDetails = response;
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
