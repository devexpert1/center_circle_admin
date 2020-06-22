import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService } from '../../../../services/api/api.service';
import {NotiService } from '../../../../services/noti/noti.service';
import {config } from '../../../../config';
import { MatSnackBar } from "@angular/material";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'kt-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  places = new FormControl();
  placeList: string[] = ['KATU', 'Kembali', 'La Cabane Bar Marcaipe', 'La Caverna', 'La Creperie' , 'La Rocca' , 'La Ursa'];
  public login: FormGroup;
  public addpropertyfun: FormGroup;
  is_submit:boolean=false;
  message:any;
  imagePath:any;
  imgURL:any='assets/media/users/user-dummy.png';
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
  zoom: number = 12;
  address_reuired:boolean=false;
  constructor( 
      public formBuilder: FormBuilder,
      private cd: ChangeDetectorRef,
      public apiservice: ApiService,
      public snackBar: MatSnackBar,
      public noti:NotiService,
      private spinner: NgxSpinnerService
        ) {
          this.makeform();
          this.propertyForm();
          }

  ngOnInit() {
  }

  makeform(){

    this.login = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.required])],      
      lname: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],           
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],      
      zip: ['', Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      confirm_password: [null, Validators.compose([Validators.required])]     
      });
  }

  propertyForm(){

    this.addpropertyfun = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      name: ['', Validators.compose([Validators.required])],      
      area: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],           
      city: ['', Validators.compose([Validators.required])],
      zip: ['', Validators.compose([Validators.required])],      
      descr: [null, Validators.compose([Validators.required])],
     
      });
  }

  justlogin(){
    
    this.is_submit= true;
    if(this.login.valid){
      if(this.login.value.password== this.login.value.confirm_password){
        this.doesNotMatch=false;
        this.spinner.show();
        const formData = new FormData();
        if(this.errors.indexOf(this.img)==-1){
          formData.append('file', this.img, this.img.name);
        }
        
        formData.append('fname', this.login.value.fname);
        formData.append('lname', this.login.value.lname);
        formData.append('email', this.login.value.email);
        formData.append('city', this.login.value.city);
        formData.append('country', this.login.value.country);
        formData.append('zip', this.login.value.zip);
        formData.append('phone', this.login.value.phone);
        formData.append('state', this.login.value.state);
        formData.append('password', this.login.value.password);      
       
        this.apiservice.post('addPlayerByAdmin/'+this.login.value.email, formData,'').subscribe((result) => {                
                 
          this.response=result;
          this.spinner.hide();

          if( this.response.status == 1){
            this.imgURL='assets/media/users/user-dummy.png';
            this.is_submit= false;
            this.login.reset();
             this.noti.popup('New owner has been added','OK','3000');
          }
          else if(this.response.status == 3){
            this.noti.popup('This email already exists, try another','OK','3000');
          }
          else{
            this.noti.popup('Something is wrong with server, Try again','OK','3000');
          }
         
        },
        err => {
          this.spinner.hide();     
        });

      }else{ 
       this.doesNotMatch=true;
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


