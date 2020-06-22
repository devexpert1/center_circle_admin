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

displayedColumns = ['sr_no','imageurl', 'name', 'position', 'goals'];
dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

displayedColumns1 = ['sr_no','imageurl', 'name', 'position','goals'];
dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);

displayedColumns2 = ['sr_no','imageurl', 'name', 'position','goals'];
dataSource2 = new MatTableDataSource<Element2>(ELEMENT_DATA2);


    murl:any=config.API_URL+'server/data/pic/';
  uurl:any=config.API_URL+'server/data/p_pics/';
  _id:any;
  response:any;
  allData:any;
  errors=['',null,undefined];
response1_came:any;
response2_came:any;
matchlist:any;
team_1:any;
team_2:any;
title:any;

team_1_players:any;
team_2_players:any;
team_3_players:any;
getjoinresult:any;
getjoinres:any;
noOfPlayers:any=0;
  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService,
    private ActivatedRoute:ActivatedRoute) { 
       
      this._id= this.ActivatedRoute.snapshot.paramMap.get('_id');
      this.spinner.show();
      this.matchdetail();
      this.getJoinMatch();

    }

  ngOnInit() {
  }

 

       matchdetail(){

          this.apiservice.post('p_matchdetails',{match_id:this._id},'').subscribe((result) => {  
          this.response1_came=true; 
          this.response=result;
          if(this.response.status == 1){     
          // this.notifi.presentToast(this.response.msg,'success'); 
          this.matchlist=this.response;
          this.team_1 = this.matchlist.match.team1
          this.team_2 = this.matchlist.match.team2
          this.title= this.matchlist.match.team1+' VS '+this.matchlist.match.team2
          console.log(this.matchlist);
          }
   
          },
          err => {
          this.response1_came=true; 
          this.noti.popup('Internal error occured','OK','3000');
          });

        }

         getJoinMatch(){ 
   
        this.apiservice.post('newGetJoinmatch',{match_id:this._id},'').subscribe((result) => {
          this.spinner.hide();
         this.response2_came=true;  
      
        this.getjoinres=result;
        console.log(this.getjoinres);
      
        if(this.getjoinres.status == 1){   
        this.dataSource = new MatTableDataSource(this.getjoinres.players1);
         this.dataSource1 = new MatTableDataSource(this.getjoinres.players2);
          this.dataSource2= new MatTableDataSource(this.getjoinres.players3);
         this.noOfPlayers = this.getjoinres.players.length
          
        }else{
          this.getjoinresult=[];
         
        }

        },
        err => {
          this.spinner.hide();
         this.response2_came=true; 
        this.noti.popup('Internal error occured','OK','3000');
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
  goals: string;
}
const ELEMENT_DATA: Element[] = [
 

];

export interface Element1 {
  sr_no: number;
  name: string;
  imageurl: string;
  position: string;
  goals: string;
}
const ELEMENT_DATA1: Element1[] = [
 

];


export interface Element2 {
  sr_no: number;
  name: string;
  imageurl: string;
  position: string;
  goals: string;
}
const ELEMENT_DATA2: Element2[] = [
 

];

