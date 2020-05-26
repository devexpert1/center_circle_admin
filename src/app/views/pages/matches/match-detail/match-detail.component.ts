import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService } from '../../../../services/api/api.service';
import {NotiService } from '../../../../services/noti/noti.service';
import {config } from '../../../../config';
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'kt-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})


export class MatchDetailComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns = ['sr_no','imageurl', 'name', 'position', 'age' ,'amt_paid', 'goals'];
  murl:any=config.API_URL+'server/data/pic/';
  uurl:any=config.API_URL+'server/data/p_pics/';
  dataSource = new MatTableDataSource<Element>([]);
  _id:any;
  response:any;
  allData:any;
  errors=['',null,undefined];

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService,
    private ActivatedRoute:ActivatedRoute) { 
      this.spinner.show();  
      this._id= this.ActivatedRoute.snapshot.paramMap.get('_id');
     
      this.details();
    }

  ngOnInit() {
  }

  details(){
  
    this.apiservice.post('adminMatchDetails',{_id:this._id},'').subscribe((result) => {               
      this.spinner.hide();  
      console.log();
      this.response = result; 
    if( this.response.status == 1){
       this.allData= this.response.data;
      console.log(this.allData);
     if(this.response.data.players.length>0){
      this.dataSource = new MatTableDataSource(this.response.data.players);
      this.cd.markForCheck();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
     }
       
    }
    else if(this.response.status == 0){
      this.noti.popup(this.response.status.msg,'OK','3000');
    }
  
    this.spinner.hide();
  
  },
  err => {
    this.spinner.hide();   
    });


  }

   myFunction(age) {  
 
      var cut= age.substring(0,4);
      console.log(cut);
      var d = new Date();
      var n = d.getFullYear();
      console.log(n-cut);     
      return n-cut ;  
  }

}
export interface Element {
  sr_no: number;
  name: string;
  imageurl: string;
  position: string;
  age: number;
  amt_paid: string;
  goals: string;
}
const ELEMENT_DATA: Element[] = [
 

];
