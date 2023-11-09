import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  
  formVisible = false;

  openForm() {
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }

  submitForm() {
    // Handle form submission logic here
  }


}
