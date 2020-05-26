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
  selector: 'kt-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
 _id:any;
 selected = 'option2';
 is_submit:boolean=false;
 message:any;
 imagePath:any;
 imgURL:any='assets/media/users/user-dummy.png';
  
 // initial center position for the map
 lat: number;
 lng: number;
 response:any;
 loading:boolean=false;
 img:any;
 errors:any=['', null, undefined];
 doesNotMatch:boolean=false;
 isSubit_property:any=false;
 propertyImg:any='assets/media/bg/bg-4.jpg';
 propertyImgBlb:any;
 ploading:any;
 udata:any;
 pdata:any;
 user_img:any;
 property_img:any;
 img_url:any=config.API_URL+'server/data/pic/';
 pimg_url:any=config.API_URL+'server/data/property/';
 pass_error:boolean=false;
 cpass_error:boolean=false;
 less_6:boolean=false;
 public login: FormGroup;
 public addpropertyfun: FormGroup;
 zoom: number = 14;
 email:any;
 address_reuired:boolean=false;

 dontmatch:boolean=false;
  constructor(
    public activated:ActivatedRoute,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService
    ) {
    this._id= this.activated.snapshot.paramMap.get('id');   
    this.makeform();
    this.propertyForm();
    this.ownerNProperty();
   }

  ngOnInit() {
  }

  makeform(){

    this.login = this.formBuilder.group({
        fname: ['', Validators.compose([Validators.required])],      
        lname: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],           
        email: ['', Validators.compose([Validators.required,Validators.email])],
        password: [''],      
        zip: ['', Validators.compose([Validators.required])],
        state: [null, Validators.compose([Validators.required])],
        country: [null, Validators.compose([Validators.required])],
        city: [null, Validators.compose([Validators.required])],
        confirm_password: [null]     
      });
  }
  
  propertyForm(){
  
    this.addpropertyfun = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required])],      
        area: ['', Validators.compose([Validators.required])],
        state: ['', Validators.compose([Validators.required])],           
        city: ['', Validators.compose([Validators.required])],
        zip: ['', Validators.compose([Validators.required])],      
        descr: [null, Validators.compose([Validators.required])],
     
      });
  }


  ownerNProperty(){
    this.spinner.show();  
    this.apiservice.post('ownerNProperty',{_id:this._id},'').subscribe((result) => {  
    this.spinner.hide(); 
    var response;
    response=result; 
    console.log(response);
    if(response.status == 1){
      this.pdata= response.property;
      this.udata= response.user;      
      this.login.patchValue({
        fname: this.udata.fname,      
        lname: this.udata.lname,
        phone: this.udata.phone,        
        email: this.udata.email,
        zip: this.udata.zip,
        state: this.udata.state,
        country: this.udata.country,
        city: this.udata.city,
       });

       if(this.errors.indexOf(this.pdata)==-1){
        this.addpropertyfun.patchValue({
          email: this.pdata.email,
          name: this.pdata.name,     
          area: this.pdata.area,
          state: this.pdata.state,    
          city: this.pdata.city,
          zip: this.pdata.zip,
          address: this.pdata.address,
          descr: this.pdata.descr,

        });

        if(this.errors.indexOf(this.pdata.cover)==-1){
           this.propertyImg= this.pimg_url+this.pdata.cover;
        }
        console.log(this.pdata.lat  );
        this.lat=Number(this.pdata.lat);
        this.lng=Number(this.pdata.lng);
        this.cd.detectChanges();
       }
    if(this.errors.indexOf(this.udata.pic)==-1){
      this.imgURL=this.img_url+this.udata.pic;
    }


      }
    else if(response.status == 0){
      this.noti.popup(response.msg,'OK','3000');
    }
  
  },
  err => {
    this.spinner.hide();   
    });

}

justlogin(){
    
  this.is_submit= true;
  if(this.login.valid){

    if(this.errors.indexOf(this.login.value.password)==-1 || this.errors.indexOf(this.login.value.confirm_password)==-1){

    if(this.errors.indexOf(this.login.value.password)>=0){
      this.pass_error=true;

    }else if(this.errors.indexOf(this.login.value.confirm_password)>=0){

      this.pass_error=true;

    }else if(this.errors.indexOf(this.login.value.password)==-1 && this.errors.indexOf(this.login.value.confirm_password)==-1){

      if(this.login.value.password.length<6){

        this.less_6=true;
      }else{
        this.less_6=false;
        //match passwords
        if(this.login.value.password==this.login.value.confirm_password){
          this.dontmatch=false;
          console.log('matching');
          this.save_edit(1);
         

        }else{
          this.dontmatch=true;          
        }

      }
      this.pass_error=false;
      this.cpass_error=false;     
    }

    }else{

      this.save_edit(0);

    }
  
   }
  }

  save_edit(p){

    
    this.spinner.show();

    const formData = new FormData();

    if(this.errors.indexOf(this.img)==-1)formData.append('file', this.img, this.img.name);
    if(p==1)  formData.append('password',this.login.value.password);
    
    formData.append('fname', this.login.value.fname);
    formData.append('lname', this.login.value.lname);
    formData.append('email', this.login.value.email);
    formData.append('city', this.login.value.city);
    formData.append('country', this.login.value.country);
    formData.append('zip', this.login.value.zip);
    formData.append('phone', this.login.value.phone);
    formData.append('state', this.login.value.state);
 
    this.apiservice.post('update_PlayerByAdmin/'+this.login.value.email+'/'+this._id, formData,'').subscribe((result) => {                
      this.spinner.hide();       
     var response;
     response =result;     
      console.log(response);


      if( response.status == 1){
        this.is_submit= false;
        this.noti.popup(response.msg,'OK','3000');
      }
      else if(response.status == 3){
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


addProperty(){
  this.isSubit_property=true;

  if(this.addpropertyfun.valid){  
    if(this.address_reuired){
       
   this.spinner.show();
   const formData = new FormData();
   if(this.errors.indexOf(this.propertyImgBlb)==-1){
     formData.append('file', this.propertyImgBlb, this.propertyImgBlb.name);
   }
       formData.append('name', this.addpropertyfun.value.name);
       formData.append('area', this.addpropertyfun.value.area);
       formData.append('state', this.addpropertyfun.value.state);
       formData.append('city', this.addpropertyfun.value.city);
       formData.append('zip', this.addpropertyfun.value.zip);
       formData.append('address', this.addpropertyfun.value.address);
       formData.append('descr', this.addpropertyfun.value.descr); 
       formData.append('lat', String(this.lat));  
       formData.append('lng',  String(this.lng));  
       formData.append('_id', this._id);  
  
   this.apiservice.post('editProperty', formData,'').subscribe((result) => {                
     
         this.spinner.hide();
         this.response=result;
         this.cd.markForCheck();
         if( this.response.status == 1){
           this.noti.popup(this.response.msg,'OK','3000');
         }
         else{
           this.noti.popup('Something is wrong with server, Try again','OK','3000');
         }
       },
       err => {
         this.spinner.hide();
         this.cd.markForCheck();   
   });

    }

  }
 }

 propertypic(files){   
   this.propertyImgBlb = files[0];
   var reader = new FileReader();
      reader.readAsDataURL(files[0]); 
   reader.onload = (_event) => { 
   this.propertyImg = reader.result; 
   this.cd.markForCheck();
 }
 }

 latlong(i){
  console.log(i);
  this.address_reuired=true;
   this.lat= i.data.geometry.location.lat;
   this.lng= i.data.geometry.location.lng;
   this.cd.markForCheck();
   console.log(this.lng);
 
}




}
