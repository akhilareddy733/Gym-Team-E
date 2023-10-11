import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  isUserLoggedIn=false;

  constructor(private router: Router){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      this.isUserLoggedIn=true;
    }
  }

  
  signout(){
    console.log("from logged out"); 
    localStorage.setItem("isUserLoggedIn", "false");
    this.router.navigate(['/home'])
    window.location.reload();
  }

}
