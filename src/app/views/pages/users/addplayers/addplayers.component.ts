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
  selector: 'kt-addplayers',
  templateUrl: './addplayers.component.html',
  styleUrls: ['./addplayers.component.scss']
})
export class AddplayersComponent implements OnInit {
 selected = 'option2';
 img_url:any=config.API_URL+'server/data/p_pics/';
 p_img_url:any;
 _id:any;
 udata:any;
 name:any;
 email:any;
 date:any;
 address_reuired:boolean=false;
 lat:any;
 lng:any;
 img:any
 imagePath:any;
 imgURL:any='assets/media/users/default-avatar.jpg';
 isSubit_property:any;
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
      
      formData.append('fname', this.login.value.fname);
      formData.append('lname', this.login.value.lname);
      formData.append('email', this.login.value.email);
      formData.append('city', this.login.value.city);
      formData.append('country', this.login.value.country);
      formData.append('zip', this.login.value.zip);
      formData.append('phone', this.login.value.phone);
      formData.append('state', this.login.value.state);
      formData.append('dob', this.login.value.dob);
      formData.append('position', this.login.value.position);
      formData.append('height', this.login.value.height);
      formData.append('weight', this.login.value.weight);
      formData.append('_id', this._id);
      formData.append('lat', this.lat);
      formData.append('lng', this.lng);
    
    
      this.apiservice.post('addPByadmin/'+this.login.value.email, formData,'').subscribe((result) => {                
        this.spinner.hide();       
       var response;
       response =result;     
        console.log(response);    
    
        if( response.status == 1){
          this.imgURL='assets/media/users/default-avatar.jpg';
          this.isSubit_property= false;
          this.login.reset();
         
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
