import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TabsauthService implements CanActivate{

  errors:any=['',null,undefined,'null','undefined',0];
  constructor(private router: Router) {
 
  }
  canActivate(): boolean {
    if (this.errors.indexOf(localStorage.getItem('admin_id'))==-1) {
      this.router.navigate(['/demo1/dashboard']);
      return false;
    }
    return true;
  }

}

