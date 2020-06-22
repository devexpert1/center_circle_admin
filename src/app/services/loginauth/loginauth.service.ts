import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService implements CanActivate{
  errors:any=['',null,undefined,'null','undefined',0];
  constructor(private router: Router) {
 
  }

  canActivate(): boolean {
    if (this.errors.indexOf(localStorage.getItem('admin_id'))>=0) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
//   canActivate(route: ActivatedRouteSnapshot): boolean{

//   //   if (this.errors.indexOf(localStorage.getItem('admin_id'))==-1) {
//   //     console.log('tab');
//   //     this.router.navigate(['/auth/login']);
//   //     return false;
//   //   }
//   //   return true;
//   // }
//   return true;


// }
}




