import { CanActivateFn, Router } from '@angular/router';

export const gymMembershipGuard: CanActivateFn = (route, state) => {
  const _router = new Router();

  if(localStorage.getItem("gymMembership")=="true") {
    return true;
  }
  else{
    alert("You dont have permission to access this page")
    return false;
  }






};
