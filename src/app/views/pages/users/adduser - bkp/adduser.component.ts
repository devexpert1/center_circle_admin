import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'kt-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  places = new FormControl();
  placeList: string[] = ['KATU', 'Kembali', 'La Cabane Bar Marcaipe', 'La Caverna', 'La Creperie' , 'La Rocca' , 'La Ursa'];

  constructor() { }

  ngOnInit() {
  }

}
