import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { VideoComponent } from './video/video.component';
import { DietplanComponent } from './dietplan/dietplan.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule } from '@angular/forms';
import { Signup2Component } from './signup2/signup2.component';
import { PaymentComponent } from './payment/payment.component';
import { SigninComponent } from './signin/signin.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DietplanDetailsComponent } from './dietplan-details/dietplan-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DeitplanDetailsComponent } from './deitplan-details/deitplan-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    ProductComponent,
    CartComponent,
    PaymentComponent,
    VideoComponent,
    DietplanComponent,
    UpdateComponent,
    Signup2Component,
    SigninComponent,
    ProductDetailsComponent,
    DietplanDetailsComponent,
    OrderHistoryComponent,
    ChatbotComponent,
    DeitplanDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
