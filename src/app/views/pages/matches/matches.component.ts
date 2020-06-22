import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService } from '../../../services/api/api.service';
import {NotiService } from '../../../services/noti/noti.service';
import {config } from '../../../config';
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'kt-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
displayedColumns = [ 'name', 'playerjoined',  'location'  , 'owner'  , 'starttime' , 'action'];
displayedColumns1 = [ 'name', 'playerjoined',  'owner', 'location' , 'startdate' , 'starttime' , 'action'];
displayedColumns2 = [ 'name', 'playerjoined',  'location' , 'startdate' , 'starttime' , 'owner' ,'action'];
displayedColumns3 = ['plr_image', 'name', 'location', 'action'];
displayedColumns4 = ['plr_image', 'name', 'location', 'action'];
displayedColumns5 = ['plr_image', 'name', 'location', 'action'];
displayedColumns6 = ['plr_image', 'name', 'location', 'action'];

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);
  dataSource2 = new MatTableDataSource<Element2>(ELEMENT_DATA2);
  dataSource3 = new MatTableDataSource<Element3>(ELEMENT_DATA3);
  dataSource4 = new MatTableDataSource<Element3>(ELEMENT_DATA4);
  dataSource5 = new MatTableDataSource<Element3>(ELEMENT_DATA4);
  dataSource6 = new MatTableDataSource<Element3>(ELEMENT_DATA4);

  response:any;
  loading:any;
    selection = new SelectionModel<Element>(true, []);
    errors:any=['', null, undefined];
    picUrl:any=config.API_URL+'server/data/pic/';
    index:any;
    _id:any;
    data_array:any;
    cancel_id:any;
    type:any;
    players:any;
    playerImg:any=config.API_URL+'server/data/p_pics/';
    invitation_id:any;
    owners:any;
    comment:any;
    voteFrom:any;
    voteTo:any;
    voteForMatch : any;
	/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
	
	
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
		this.dataSource1.paginator = this.paginator;
	    this.dataSource1.sort = this.sort;
		this.dataSource2.paginator = this.paginator;
	    this.dataSource2.sort = this.sort;
  }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService) { 

      this.spinner.show();
      this.today();
      this.upcoming();
      this.previous();

    }

    today(){

      this.apiservice.post('adminTodayMatches','','').subscribe((result) => {               
      this.loading=false;    
      this.response=result;
      this.cd.markForCheck();
      if( this.response.status == 1){
        console.log(this.response.data);
        this.dataSource = new MatTableDataSource(this.response.data);
        this.cd.markForCheck();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      }
      else if(this.response.status == 0){
        this.noti.popup(this.response.msg,'OK','3000');
      }
    
    },
    err => {
      this.spinner.hide();   
      });
  
  }


  upcoming(){
    this.apiservice.post('adminUpcomingMatches','','').subscribe((result) => {               
    var response;   
    response= result    
     this.cd.markForCheck();
    if(response.status == 1){
      console.log(response.data);
      this.dataSource1 = new MatTableDataSource(response.data);
      this.cd.markForCheck();
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;      
    }
    else if(response.status == 0){
      this.noti.popup(response.msg,'OK','3000');
    }  
  },
  err => {
    this.spinner.hide();   
    });

}


previous(){

      this.apiservice.post('adminPreviousMatches','','').subscribe((result) => {
        this.spinner.hide();                  
      var response;   
      response= result    
      this.cd.markForCheck();
      if(response.status == 1){
        console.log(response.data);
        this.dataSource2 = new MatTableDataSource(response.data);
        this.cd.markForCheck();
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;      
      }
      else if(response.status == 0){
        this.noti.popup(response.msg,'OK','3000');
      }  
    },
    err => {
      this.spinner.hide();   
      });

}



  ngOnInit() {
  }
open(content) {
       
        this.modalService.open(content).result.then((result) => {       
        });
    }

  deleteUser(i, _id, type){
       this.cancel_id=_id;
       this.index=i;
      this.type=type;
      }

  yesCancel(){

    this.modalService.dismissAll();
    this.apiservice.post('CancelMatchByAdmin',{_id:this.cancel_id},'').subscribe((result) => {               
      var response;   
      response= result    
      this.cd.markForCheck();
      if(response.status == 1){

         if(this.type==1) {
           this.dataSource.data.splice(this.index,1);
           console.log(this.type);
          }
         if(this.type==2) {
           this.dataSource1.data.splice(this.index,1);
           console.log(this.type);
          }
          this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;    
         this.dataSource1.paginator = this.paginator;
         this.dataSource1.sort = this.sort; 

       
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;    
        this.cd.markForCheck(); 
        this.noti.popup(response.msg,'OK','3000'); 
      }
      else if(response.status == 0){
        this.noti.popup(response.msg,'OK','3000');
      }  
    },
    err => {
      this.spinner.hide();   
      });

  }


  getPlayers(_id){
    this.invitation_id=_id;
    this.spinner.show();  
    this.apiservice.post('getPlayersByAdmin',{match_id:_id},'').subscribe((result) => {               
      this.spinner.hide();     
    var res;
    res=result;
    res=result;
    this.cd.markForCheck();
    if( res.status == 1){
      this.dataSource3 = new MatTableDataSource(res.data);
      this.cd.markForCheck();
      this.dataSource3.paginator = this.paginator;
      this.dataSource3.sort = this.sort;
     
    }
    else if(this.response.status == 0){
      this.noti.popup(this.response.msg,'OK','3000');
    }
  
  },
  err => {
    this.spinner.hide();   
    });

}

fromgetPlayers(_id){
  this.voteForMatch = _id
  this.invitation_id=_id;
  this.spinner.show();  
  this.apiservice.post('getPlayersForVote',{match_id:_id},'').subscribe((result) => {               
    this.spinner.hide();     
  var res;
  res=result;
  res=result;
  this.cd.markForCheck();
  if( res.status == 1){
    this.dataSource5 = new MatTableDataSource(res.data);
    this.cd.markForCheck();
    this.dataSource5.paginator = this.paginator;
    this.dataSource5.sort = this.sort;

    this.dataSource6 = new MatTableDataSource(res.data);
    this.cd.markForCheck();
    this.dataSource6.paginator = this.paginator;
    this.dataSource6.sort = this.sort;
   
  }
  else if(this.response.status == 0){
    this.noti.popup(this.response.msg,'OK','3000');
  }

},
err => {
  this.spinner.hide();   
  });

}



select(_id){
 
  this.apiservice.post('invitePlayerByAdmin',{player_id:_id,match_id:this.invitation_id},'').subscribe((result) => {               
    var response;   
    response= result    
    this.cd.markForCheck();
    if(response.status == 1){

       if(this.type==1) {
         this.dataSource.data.splice(this.index,1);
         console.log(this.type);
        }
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;    
       this.dataSource1.paginator = this.paginator;
       this.dataSource1.sort = this.sort; 

     
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;    
      this.cd.markForCheck(); 
      this.noti.popup(response.msg,'OK','3000'); 
    }
    else if(response.status == 0){
      this.noti.popup(response.msg,'OK','3000');
    }  
  },
  err => {
    this.spinner.hide();   
    });

}

finish(){
  this.modalService.dismissAll();
}

getowners(_id){
  this.invitation_id=_id;
  this.spinner.show();  
  this.apiservice.post('getOwners','','').subscribe((result) => {               
    this.spinner.hide();     
  var res;
  res=result;
  res=result;
  this.cd.markForCheck();
  if( res.status == 1){
    this.dataSource4 = new MatTableDataSource(res.data);
    this.cd.markForCheck();
    this.dataSource4.paginator = this.paginator;
    this.dataSource4.sort = this.sort;
   
  }
  else if(this.response.status == 0){
    this.noti.popup(this.response.msg,'OK','3000');
  }

},
err => {
  this.spinner.hide();   
  });

}

dismiss(){
  this.modalService.dismissAll();
}

voteNow(){

   var from;
   from = this.voteFrom;
   var to;
   to = this.voteTo


  
  if(this.errors.indexOf(this.comment)==-1 && this.errors.indexOf(from)==-1 && this.errors.indexOf(to)==-1){
     if(from==to){
           this.noti.popup('Please choose different player','ok','3000');
    }else{
    this.spinner.show();  
    var reqdata = { 
      match_id :this.voteForMatch,
      toId : to,
      fromId : from,
      comment : this.comment,
    }

    this.apiservice.post('voteForMOTM',reqdata,'').subscribe((result) => {  
      this.spinner.hide();    
      var res;
      res= result;
      if(res.status==1){  
        this.comment= '';
        this.noti.popup('You have voted the player successfully','ok','3000');
        this.modalService.dismissAll();
       
       }else if(res.status==2){

        this.noti.popup('You have already voted for this match','ok','3000');

      }else{
        this.noti.popup('Internal server error','ok','3000');
        

      }
   
   
},
err => {
 
});

    }
  

}else{

  if(this.errors.indexOf(this.comment)>=0){
    this.noti.popup('Please write some comment','ok','3000');
  }
  if(this.errors.indexOf(from)>=0){
    this.noti.popup('Please select voting player','ok','3000');
  }
  if(this.errors.indexOf(to)>=0){
    this.noti.popup('Please select player to vote','ok','3000');
  }
}

}

voteToId(id){

  console.log('qwertyui')
  this.voteTo = id
}

voteFromId(id){
  this.voteFrom = id
 
}

}

export interface Element {  
  name: string;
  location: string;
  playerjoined: string;
  starttime: string;
  endtime: string;
  owner: string;
  }
const ELEMENT_DATA: Element[] = [
 
];

export interface Element1 {
  name: string;  
  startdate: string;
  location: string; 
  playerjoined: string;
  starttime: string;
  endtime: string;
  owner: string;
  }
const ELEMENT_DATA1: Element1[] = [
 
];

export interface Element2 {
  name: string;  
  startdate: string;
  location: string; 
  playerjoined: string;
  starttime: string;
  endtime: string;
  owner: string;
  }
const ELEMENT_DATA2: Element2[] = [
 
];


export interface Element3 {
  name: string;  
  location: string; 
  plr_image: string;
  }
  
const ELEMENT_DATA3: Element3[] = [


];

export interface Element4 {
  name: string;  
  location: string; 
  plr_image: string;
  }
  
const ELEMENT_DATA4: Element4[] = [


];