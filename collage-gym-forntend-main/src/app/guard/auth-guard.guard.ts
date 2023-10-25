import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const _router = new Router();
  if(localStorage.getItem("isUserLoggedIn")=="true") {
    return true;
  }
  else{
    alert("Please login first")
    _router.navigate(['/signin']).then(()=>{
      window.location.reload();
    });
    return false;
  }
};
