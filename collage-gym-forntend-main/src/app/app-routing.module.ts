import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { VideoComponent } from './video/video.component';
import { DietplanComponent } from './dietplan/dietplan.component';
import { gymMembershipGuard } from './guard/gym-membership.guard';
import { UpdateComponent } from './update/update.component';
import { Signup2Component } from './signup2/signup2.component';
import { PaymentComponent } from './payment/payment.component';
import { SigninComponent } from './signin/signin.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DietplanDetailsComponent } from './dietplan-details/dietplan-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'signup', component:Signup2Component},
  {path: 'profile', component:ProfileComponent, canActivate:[authGuardGuard]},
  {path: 'update', component:UpdateComponent, canActivate:[authGuardGuard]},
  {path: 'product', component:ProductComponent, canActivate:[authGuardGuard]},
  {path: 'product-details/:productid', component:ProductDetailsComponent, canActivate:[authGuardGuard]},
  {path: 'cart', component:CartComponent, canActivate:[authGuardGuard]},
  {path: 'payment', component:PaymentComponent, canActivate:[authGuardGuard]},
  {path: 'video', component:VideoComponent, canActivate:[authGuardGuard,gymMembershipGuard]},
  {path: 'dietplan', component:DietplanComponent, canActivate:[authGuardGuard,gymMembershipGuard]},
  {path: 'dietplan/:dietplanid', component:DietplanDetailsComponent, canActivate:[authGuardGuard,gymMembershipGuard]},
  {path: 'order-history', component:OrderHistoryComponent, canActivate:[authGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
