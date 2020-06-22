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
import {DatePipe} from '@angular/common'
import moment from 'moment';
@Component({
  selector: 'kt-editplayers',
  templateUrl: './editplayers.component.html',
  styleUrls: ['./editplayers.component.scss']
})
export class EditplayersComponent implements OnInit {
 selected = 'option2';
 img_url:any=config.API_URL+'server/data/p_pics/';
 p_img_url:any;
 _id:any;
 udata:any;
 isSubit_property:boolean=false;
 name:any;
 email:any;
 date:any;
 address_reuired:boolean=false;
 lat:any;
 lng:any;
 img:any
 imagePath:any;
 imgURL:any='assets/media/users/100_2.jpg';
 userSettings = {};
 public login: FormGroup;
 errors:any=['', null, undefined];
  constructor(public activated:ActivatedRoute,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService) {
      this._id =this.activated.snapshot.paramMap.get('id');      
      this.makeform();
      this.getPlayer();
     

      
     }

  ngOnInit() {
  }

  makeform(){

    this.login = this.formBuilder.group({
        fname: ['', Validators.compose([Validators.required])],      
        lname: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],           
        email: ['', Validators.compose([Validators.required,Validators.email])],      
        zip: ['', Validators.compose([Validators.required])],
        state: ['', Validators.compose([Validators.required])],
        country: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        dob: ['', Validators.compose([Validators.required])], 
        position: ['', Validators.compose([Validators.required])],  
        height: ['', Validators.compose([Validators.required])],  
        weight: ['', Validators.compose([Validators.required])],     
      });

  }

  getPlayer(){
    this.spinner.show();  
    this.apiservice.post('getPlayer',{_id:this._id},'').subscribe((result) => {  
    this.spinner.hide(); 
    var response;
    response=result; 
    console.log(response);
    if(response.status == 1){  
      this.udata= response.data;  
      if(this.errors.indexOf(this.udata.pic)==-1){
        this.p_img_url= this.udata.pic;
        this.imgURL= this.img_url+this.p_img_url;
      }
         
      this.name= this.udata.fname[0].toUpperCase()+this.udata.fname.slice(1)+' '+this.udata.lname[0].toUpperCase()+this.udata.lname.slice(1)
      this.email=this.udata.email;    
      if(this.errors.indexOf(this.udata.country)==-1){
        this.userSettings['inputString'] = this.udata.country+','+this.udata.state+','+this.udata.city;
        this.userSettings = Object.assign({},this.userSettings);

      }
      
    

      this.login.patchValue({
        fname:  this.udata.fname,     
        lname: this.udata.lname,     
        phone: this.udata.phone,     
        email: this.udata.email,           
        zip: this.udata.zip,     
        state: this.udata.state,     
        country: this.udata.country,     
        city: this.udata.city,     
        dob: this.udata.dob,      
        position: this.udata.position,     
        height: this.udata.height,     
        weight: this.udata.weight,     
       });

      }
    else if(response.status == 0){
      this.noti.popup(response.msg,'OK','3000');
    }
  
  },
  err => {
    this.spinner.hide();   
    });

}

latlong(i){
  console.log(i);
  this.address_reuired=true;
   this.lat= i.data.geometry.location.lat;
   this.lng= i.data.geometry.location.lng;
   this.cd.markForCheck();
   console.log(this.lng);
 
}

save_edit(p){ 
  this.isSubit_property=true;   
  if(this.login.valid){

    if(this.address_reuired){
      this.spinner.show();
      const formData = new FormData();
      if(this.errors.indexOf(this.img)==-1)formData.append('file', this.img, this.img.name);
    
      var current = new Date(this.login.value.dob);
      var current_date = current.getFullYear()+'-'+(((current.getMonth()+1) < 10 ? '0'+(current.getMonth()+1) : (current.getMonth()+1)))+'-'+(current.getDate() < 10 ? '0'+current.getDate() : current.getDate());

      formData.append('fname', this.login.value.fname);
      formData.append('lname', this.login.value.lname);
      formData.append('email', this.login.value.email);
      formData.append('city', this.login.value.city);
      formData.append('country', this.login.value.country);
      formData.append('zip', this.login.value.zip);
      formData.append('phone', this.login.value.phone);
      formData.append('state', this.login.value.state);
      formData.append('dob', current_date);
      formData.append('position', this.login.value.position);
      formData.append('height', this.login.value.height);
      formData.append('weight', this.login.value.weight);
      formData.append('_id', this._id);
      formData.append('lat', this.lat);
      formData.append('lng', this.lng);
    
    
      this.apiservice.post('updatePByadmin/'+this.login.value.email+'/'+this._id, formData,'').subscribe((result) => {                
        this.spinner.hide();       
       var response;
       response =result;     
        console.log(response);    
    
        if( response.status == 1){
          this.name= this.login.value.fname[0].toUpperCase()+this.login.value.fname.slice(1)+' '+this.login.value.lname[0].toUpperCase()+this.login.value.lname.slice(1)
          this.email=this.login.value.email;  
          this.cd.markForCheck();
          this.isSubit_property= false;
          this.noti.popup(response.msg,'OK','3000');
        }
        else if(response.status == 2){
          this.noti.popup(response.msg,'OK','3000');
        }
        else{
          this.noti.popup('Something is wrong with server, Try again','OK','3000');
        }
       
      },
      err => {
        this.spinner.hide();     
      });

    }
  
  

  }

}

preview(files) {
  
  this.img = files[0];
  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
  this.imgURL = reader.result; 
  this.cd.markForCheck();
}

}

}
