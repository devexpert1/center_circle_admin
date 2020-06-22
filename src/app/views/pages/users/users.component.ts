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
  selector: 'kt-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  response:any;
  loading:any;
  displayedColumns = ['imageurl' , 'name', 'email', 'phone' ,'location', 'matches' ,'todaymatch' ,'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  errors:any=['', null, undefined];
  picUrl:any=config.API_URL+'server/data/pic/';
  index:any;
  _id:any;
  data_array:any;
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
    private spinner: NgxSpinnerService
    ) {
      this.spinner.show();
      this.getOwners();
      
         }

  ngOnInit() {
  }

open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }
getOwners(){

    this.apiservice.post('getOwners','','').subscribe((result) => {               
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);    
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

whichUser(i,_id){
this.index=i;
this._id=_id;
}

async deleteIt(){
  this.modalService.dismissAll();
  this.spinner.show();
  this.apiservice.post('deleteOwner',{_id:this._id},'').subscribe((result) => {               
    
   var response;  
   response = result; 
  if( response.status == 1){
    this.dataSource.data.splice(this.index,1);
    this.cd.markForCheck();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

}

export interface Element {
  imageurl: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  matches: string;
  todaymatch: string;
}
const ELEMENT_DATA: Element[] = [
 
];