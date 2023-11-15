import { NgForm } from '@angular/forms';
import { AllServicesService } from '../service/all-services.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, Renderer2, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  
  formVisible = false;
  userQuestion:any="";
  loader:any;

  // chat vars
  questionsAndAnswers:any;
  chatdata=[
    {
      "question": "",
      "answer": ""
    }
  ]
  // question found flag
  validQuestioinFlag:any=false;
  questionAskedFlag:any=false;


  constructor(private service:AllServicesService
    ,
    private renderer: Renderer2, private el: ElementRef){
    this.getChatData();
  }

  // for form toggle
  openForm() {
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }

  // get all questions at initial load
  getChatData(){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    this.service.getChatAnswers(headers).subscribe(
      (response)=>{
        if(response){
          this.questionsAndAnswers=response;
          console.log(this.questionsAndAnswers)
        }
      },(error)=>{
        this.loader=false
      }
    )
    
  }

  // submmit the form
  // submitForm(chatForm:any) {
  //   console.log('Form data:', chatForm.value.message);
  // }

  submitForm(chatform:any){
    this.loader = true;
    const key = localStorage.getItem("headers")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`
    });

    let question = chatform.value.message
    if(question){
      this.questionAskedFlag=true
    }

    if (this.chatdata.length > 4) {
      this.chatdata.shift(); // Remove the first item
    }

    for(let i=0; i<this.questionsAndAnswers.length; i++){

      if(this.questionsAndAnswers[i].ques==question){
        this.chatdata.push({
          "question":question,
          "answer":this.questionsAndAnswers[i].ans
        })
        console.log("the question answer is :", question, this.questionsAndAnswers[0].ans)
        this.validQuestioinFlag=true;
      }
    }

    if(this.validQuestioinFlag==false){
      this.chatdata.push(
        {
          "question":question,
          "answer":"Please ask a valid question"
        }
      )
    }

    this.userQuestion=""

  }


  // checkAndRemoveData() {
  //   this.sampleData.forEach(item => {
  //     const lines = item.ques.split('\n').length;
  //     if (lines > this.maxLines) {
  //       this.sampleData.shift(); // Remove the first data
  //       return;
  //     }
  //   });
  // }




  ngAfterViewChecked() {
    this.checkAndRemoveDataIfNeeded();
  }

  checkAndRemoveDataIfNeeded() {
    const chatTextBox = this.el.nativeElement.querySelector('.chat-text-box');

    if (chatTextBox.scrollHeight > 490) {
      this.removeFirstData();
    }
    if (this.shouldRemoveData()) {
      this.removeFirstData();
    }
  }

  shouldRemoveData(): boolean {
    return this.chatdata.some(item => !item.question && !item.answer) && this.chatdata.length > 0;
  }


  removeFirstData() {
    if (this.chatdata.length > 0) {
      this.chatdata.shift(); // Remove the first data
    }
  }



}
