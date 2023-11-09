import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dietplan-details',
  templateUrl: './dietplan-details.component.html',
  styleUrls: ['./dietplan-details.component.css']
})
export class DietplanDetailsComponent {

  dietPlans: any;
  loader: any = false;
  formSubmitted=false;
  height:any;
  weight:any;
  bmivalue:any;

  constructor(private service:AllServicesService,
    private router:Router){
    if(localStorage.getItem("isUserLoggedIn")=="true" && localStorage.getItem("gymMembership")=="true"){
    }
    else{
      this.router.navigate([{ outlets: { outletName: null } }]).then(() => {
        this.router.navigate([{ outlets: { outletName: '/home' } }]);
      });
    }
  }

}
