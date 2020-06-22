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
  selector: 'kt-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss']
})
export class MatchResultsComponent implements OnInit {
  closeResult: string;
  Matchresults:any;
  matchdetails:any;
  _id:any;
  errors:any=['',null,undefined];
  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService,
    private ActivatedRoute:ActivatedRoute
    ){         
      this._id=  this.ActivatedRoute.snapshot.paramMap.get('_id');
      console.log(this._id);
      this.getResults();     
    }

  ngOnInit() {
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

  getResults(){
    this.apiservice.post('getResultsByAdmin',{_id:this._id},'').subscribe((result) => {               
    var response;   
    response= result    
     this.cd.markForCheck();
    if(response.status == 1){
      this.Matchresults = response.data.results;    
      this.matchdetails = response.data.match_details;    
    }
    else if(response.status == 0){
      
    }  
  },
  err => {
    this.spinner.hide();   
    });

}




}
