import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(){
    const currentURL = window.location.href;
    console.log(currentURL);
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const path = window.location.pathname;
    const query = window.location.search;
    const hash = window.location.hash;

    console.log("Protocol:", protocol);
    console.log("Hostname:", hostname);
    console.log("Path:", path);
    console.log("Query:", query);
    console.log("Hash:", hash);

  }

}
