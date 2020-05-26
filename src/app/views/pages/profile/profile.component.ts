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
  selector: 'kt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile:any;
  admin_id:any;
  imgURL:any='assets/media/users/default-avatar.jpg';
  img:any;
  isSubit_property:any;
  is_submit_pass:boolean=false;
  errors:any=['', null, undefined];
  url:any=config.API_URL+'server/data/admin_pic/';
  resetPassword:FormGroup;
  public login: FormGroup;
  dont_match:boolean=false;
  static_email:any;
  static_name:any;
  constructor(

    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public apiservice: ApiService,
    public snackBar: MatSnackBar,
    public noti:NotiService,
    private spinner: NgxSpinnerService

  ) {
        this.makeform();
        this.passwordForm();
        this.admin_id= localStorage.getItem('admin_id');
        this.getProfile();   

   }

   makeform(){

    this.login = this.formBuilder.group({
        fname: ['', Validators.compose([Validators.required])],      
        lname: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],           
        email: ['', Validators.compose([Validators.required,Validators.email])]      
      });
  }


  passwordForm(){
    this.resetPassword = this.formBuilder.group({
        opassword: ['', Validators.compose([Validators.required])],      
        npassword: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
        cpassword: ['', Validators.compose([Validators.required])],           
          
      });
  }

  ngOnInit() {
  }

  getProfile(){
    this.apiservice.post('getAdminProfile',{_id:this.admin_id},'').subscribe((result) => {               
    var response;   
    response= result    
     this.cd.markForCheck();
    if(response.status == 1){
      if(this.errors.indexOf(response.data.pic)==-1){
          this.imgURL= this.url+response.data.pic;
      }
      this.static_email=response.data.email;
      this.static_name=    response.data.fname[0].toUpperCase()+response.data.fname.slice(1)+' '+ response.data.lname[0].toUpperCase()+response.data.lname.slice(1)

      this.login.patchValue({
        fname:response.data.fname,
        lname:response.data.lname,
        email:response.data.email,
        phone:response.data.phone
      });
    this.profile= response.data;   
    }
    else if(response.status == 0){
      this.noti.popup(response.msg,'OK','3000');
    }  
  },
  err => {
    this.spinner.hide();   
    });

}

preview(files) {
  
  this.img = files[0];
  var reader = new FileReader();
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
  this.imgURL = reader.result; 
  this.cd.markForCheck();
}

}

save_edit(p){ 
  this.isSubit_property=true;   
  if(this.login.valid){

      this.spinner.show();
      const formData = new FormData();
      if(this.errors.indexOf(this.img)==-1)formData.append('file', this.img, this.img.name);
      formData.append('fname', this.login.value.fname);
      formData.append('lname', this.login.value.lname);
      formData.append('email', this.login.value.email);
      formData.append('phone', this.login.value.phone);   
    
      this.apiservice.post('updateAdminProfile/'+this.login.value.email+'/'+this.admin_id, formData,'').subscribe((result) => {                
        this.spinner.hide();       
       var response;
       response =result;     
        console.log(response);    
    
        if( response.status == 1){

          this.static_email=this.login.value.email;
          this.static_name= this.login.value.fname[0].toUpperCase()+this.login.value.fname.slice(1)+' '+                      this.login.value.lname[0].toUpperCase()+this.login.value.lname.slice(1)

          this.isSubit_property= false;
          this.noti.popup(response.msg,'OK','3000');
          this.cd.markForCheck();
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

async resetpass(){
  this.is_submit_pass=true;
  if(this.resetPassword.valid){

    if(this.resetPassword.value.npassword==this.resetPassword.value.cpassword){
   
      this.spinner.show();
 
  
      this.apiservice.post('AdminPasswordUpdate',{_id:this.admin_id,password:this.resetPassword .value.opassword,npassword:this.resetPassword .value.npassword},'').subscribe((result) => {                
        this.spinner.hide();       
        var response;
       response =result;     
        console.log(response);    
    
        if( response.status == 1){
          this.is_submit_pass=false;
          this.isSubit_property= false;
        
          this.resetPassword.reset();
         
          this.noti.popup(response.msg,'OK','3000');
        }
    
        else{
          this.noti.popup(response.msg,'OK','3000');
        }
       
      },
      err => {
        this.spinner.hide();     
      }); 

    }else{

      this.dont_match=true;
    }
}

}

}
