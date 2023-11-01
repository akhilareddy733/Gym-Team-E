import { CanActivateFn, Router } from '@angular/router';
import Swal
 from 'sweetalert2';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const _router = new Router();
  if(localStorage.getItem("isUserLoggedIn")=="true") {
    return true;
  }
  else{
    Swal.fire({
      title: "Please login first",
      icon: "info",
      confirmButtonText: 'OK'
    });
    _router.navigate(['/signin']).then(()=>{
      window.location.reload();
    });
    return false;
  }
};


