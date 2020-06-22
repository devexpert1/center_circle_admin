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
@Component({
  selector: 'kt-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {
  displayedColumns = ['match' , 'player_img', 'player' ,'votes'];
 
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
 
  selection = new SelectionModel<Element>(true, []);
  response:any;
  loading:any;
   errors:any=['', null, undefined];
  picUrl:any=config.API_URL+'server/data/team/';
  plaerUrl:any=config.API_URL+'server/data/p_pics/';
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
      this.getVotesData();
      
         }

  ngOnInit() {
  }

 

        getVotesData(){
	      this.apiservice.post('getVotesData','','').subscribe((result) => {  
	  
	      this.spinner.hide();  
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

 
	
}

export interface Element {
  match: string;
  player_img: string;
  player: string;
  votes: string;
}
const ELEMENT_DATA: Element[] = [
 
];

 