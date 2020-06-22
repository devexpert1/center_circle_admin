import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material";
@Injectable({
  providedIn: 'root'
})
export class NotiService {

  constructor(public snackBar: MatSnackBar) { }

  public popup(m,a,d){
    this.snackBar.open(m, a, {
      duration: d,
   });
  }


}
