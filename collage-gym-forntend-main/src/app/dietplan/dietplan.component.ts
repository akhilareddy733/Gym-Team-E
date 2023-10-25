import { Component } from '@angular/core';
import { AllServicesService } from '../service/all-services.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dietplan',
  templateUrl: './dietplan.component.html',
  styleUrls: ['./dietplan.component.css'],
})
export class DietplanComponent {

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

  getDietPlan() {
    // formula = weight / height in m ^ 2
    let heightInMeter=this.height * 0.01
    let squareHeight = heightInMeter*heightInMeter

    this.bmivalue = Number((this.weight / squareHeight).toFixed(0))

    console.log( "int bmi value" ,this.bmivalue)

    this.loader = true;
    this.formSubmitted = true;
    const key = localStorage.getItem('headers');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${key}`,
    });



    const params = {
      body_mass_index__lt_18: Number(this.bmivalue.toFixed(0))
    };

    console.log("params: " + params);


    console.log("params: " + this.bmivalue);

    this.service.getDietPlans(params, headers).subscribe(
      (response) => {
        this.loader = false;
        this.dietPlans = response;
        console.log(response);
        // if (response.id) {
          // this.products = response
        // }
      },
      (error) => {
        alert(error.status + ' ' + error.statusText);
      }
    );
  }
}
