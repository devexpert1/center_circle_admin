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
import moment from 'moment';
@Component({
  selector: 'kt-adduser',
  templateUrl: './addmatch.component.html',
  styleUrls: ['./addmatch.component.scss']
})
export class AddmatchComponent implements OnInit {
 selected = 'option2';
 img_url:any=config.API_URL+'server/data/p_pics/';
 team_url:any=config.API_URL+'server/data/team/';
 p_img_url:any;
 _id:any;
 udata:any;
 name:any;
 email:any;
 date:any;
 stime:any;
 etime:any;
 address_reuired:boolean=false;
 lat:any;
 lng:any;
 img:any
 imagePath:any;
 imgURL:any='assets/media/bg/bg-4.jpg';
 isSubit_property:any;
 address:any;
 ids1:any=[];
 limit:any;

 //////////
 team1_name:any='Team 1';
 team2_name:any='Team 2';

 team1_id:any='';
 team2_id:any='';

 team1_player_ids:any=[];
 team2_player_ids:any=[];

 team1_input_name:any='Team 1'
 team2_input_name:any='Team 2'

team_1_type:any=0;
team_2_type:any=0;

 //////////

 public login: FormGroup;
 errors:any=['', null, undefined];
 image_selected:boolean=false;
 displayedColumns3 = ['plr_image', 'name', 'location', 'action'];
 displayedColumns2 = ['team_image', 'name', 'action'];
 dataSource3 = new MatTableDataSource<Element3>(ELEMENT_DATA3);
 dataSource2 = new MatTableDataSource<Element2>(ELEMENT_DATA2);

 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;
ngAfterViewInit() {
   this.dataSource3.paginator = this.paginator;
   this.dataSource3.sort = this.sort;

   this.dataSource2.paginator = this.paginator;
   this.dataSource2.sort = this.sort;


}

  constructor(public activated:ActivatedRoute,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService,
    private router:Router) {
      this._id =this.activated.snapshot.paramMap.get('_id');    
      this.makeform();   
      this.limit =  this.login.value.type;
      
     }

  ngOnInit() {
  }

  makeform(){

    this.login = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required])], 
        stime: ['', Validators.compose([Validators.required])], 
        duration: ['', Validators.compose([Validators.required])], 
        date: ['', Validators.compose([Validators.required])], 
        type: ['5', Validators.compose([Validators.required])],   
        gender: ['m', Validators.compose([Validators.required])],   
       
     });

  }

 

save_edit(p){

 

  this.isSubit_property=true;   

  if(this.login.valid){

 
    this.spinner.show();

    var t1 = this.errors.indexOf(this.team1_name)==-1 ? this.team1_name : 'Team 1';
    var t2 = this.errors.indexOf(this.team2_name)==-1 ? this.team2_name : 'Team 2';

      var reqData= {
        _id:  this._id,
        name: t1 + ' VS ' + t2,
        date:  this.login.value.date.split('T')[0],
        stime: this.login.value.stime,
        // etime: this.login.value.etime,
        players: Number(this.login.value.type)*2,
        team1_name:  this.errors.indexOf(this.team1_name)==-1 ? this.team1_name : 'Team 1',
        team2_name:  this.errors.indexOf(this.team2_name)==-1 ? this.team2_name : 'Team 2',
        request_match: '0',
        fullday: '0',
        team1_player_ids: this.team1_player_ids.length!=0 ? this.team1_player_ids : [],
        team2_player_ids: this.team2_player_ids.length!=0 ? this.team2_player_ids : [],
        team1_team_id: this.team1_id,
        team2_team_id: this.team2_id,
        team_2_type: this.team2_id,
        team_1_type: this.team_1_type,
        gender: this.login.value.gender, 
      }
 
  
      this.apiservice.post('addmatch', reqData,'').subscribe((result) => {                
        this.spinner.hide();       
        var response;
        response =result;     
        console.log(response);    
    
        if( response.status == 1){
          this.router.navigate(['/demo1/matches/']);
          this.isSubit_property= false;
          this.login.reset();
         
          this.noti.popup(response.msg,'OK','3000');
        }
        else if(response.status == 3){
          this.noti.popup(response.msg,'OK','3000');  
        
         }
         else if(response.status = 6){
          this.noti.popup('You can not add match for past time','OK','3000');  
        
         }
         else if(response.status == 7){
          this.noti.popup('End time should be greater than start time','OK','3000');  
        
         }
          else{
            this.noti.popup(response.msg,'OK','3000');  

        }
       
      },
      err => {
        this.spinner.hide();     
      });

 
  
  

  }

}

 

open(content) {
  
  this.modalService.open(content).result.then((result) => {       
  });
}


getPlayers(t){
  this.spinner.show();
  var req = t==1 ? JSON.stringify(this.team2_player_ids) : JSON.stringify(this.team1_player_ids)

  this.apiservice.post('getPlayersForAddMatch',{ids: req},'').subscribe((result) => { 
    this.spinner.hide();

    var res;
    res = result;
   
 
          if(res.status == 1){     
            this.dataSource3 = new MatTableDataSource(res.data);
            this.cd.markForCheck();
            this.dataSource3.paginator = this.paginator;        
          }
          else{
            this.dataSource3 = new MatTableDataSource([]);
          }
 
},
err => {
  this.spinner.hide();
});


 }

 getTeams(t){
  this.spinner.show();
  
    
  var req = t==1 ? this.team2_id : this.team1_id
  this.apiservice.post('getTeamsForAddMatch', {id: req} ,'').subscribe((result) => {  
    this.spinner.hide();
          var res;
          res = result;
          if(res.status == 1){     
            this.dataSource2 = new MatTableDataSource(res.data);
            this.cd.markForCheck();
            this.dataSource2.paginator = this.paginator;        
          }
          else{
            this.dataSource2 = new MatTableDataSource([]);
          }

},
err => {
  this.spinner.hide();
});


 }

 FieldsChange1(values:any,id){
   this.team_1_type = 2;
  if(values.checked){                       
    if(this.team1_player_ids.length<this.login.value.type){

      this.team1_player_ids.push(id);

    }
     
  }else{

    var index= this.team1_player_ids.indexOf(id);
    this.team1_player_ids.splice(index, 1);
  
  } 

  }

  FieldsChange2(values:any,id){
    this.team_2_type = 2;
    if(values.checked){                       
      if(this.team2_player_ids.length<this.login.value.type){
  
        this.team2_player_ids.push(id);
  
      }
       
    }else{
  
      var index= this.team2_player_ids.indexOf(id);
      this.team2_player_ids.splice(index, 1);
    
    } 
  
    }


    finish(t, id, name){
      
      if(t==1){
        this.team1_player_ids = []
        this.team_1_type = 1;
        this.team1_id = id;
        this.team1_name = name
      }
       else{
        this.team2_player_ids = []
        this.team_2_type = 1;
        this.team2_id = id;
        this.team2_name = name
    }
    this.modalService.dismissAll();
    
  }

  finishPlayerIds(t){

    if(t==1){

      this.team1_name = this.team1_input_name 

    }
     else{
      this.team2_name = this.team2_input_name 
      
  }
  this.modalService.dismissAll();
  
}

limit_value(){
  this.limit =  this.login.value.type;
  this.team1_player_ids = [];
  this.team2_player_ids = [];
}


}


export interface Element3 {
  name: string;  
  location: string; 
  plr_image: string;
  }
  
const ELEMENT_DATA3: Element3[] = [


];

export interface Element2 {
  name: string;  
  location: string; 
  team_image: string;
  }
  
const ELEMENT_DATA2: Element2[] = [


];