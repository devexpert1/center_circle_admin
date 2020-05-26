import { shuffle } from 'lodash';
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	errors=['',null,undefined];
	p_picUrl:any=config.API_URL+'server/data/p_pics/';
	picUrl:any=config.API_URL+'server/data/pic/';
	TOwner:any;
	TPlayer:any;
	total_matches:any;
	displayedColumns = ['position' , 'imageurl'  , 'name' ,'email'    , 'phone', 'location' , 'matches' ];
	displayedColumns1 = ['position' , 'imageurl' , 'name' , 'email'  , 'phone' , 'matchesplayed' ]; 

    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
	dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);
	 
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
		this.dataSource1.paginator = this.paginator;
	    this.dataSource1.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
  }

	constructor(
			private layoutConfigService: LayoutConfigService,
			public activated:ActivatedRoute,
			private modalService: NgbModal,
			public formBuilder: FormBuilder,
			private cd: ChangeDetectorRef,
			public apiservice: ApiService,
			public snackBar: MatSnackBar,
			public noti:NotiService,
			private spinner: NgxSpinnerService,
			private router:Router
	) {
      this.getdata();

	  }

	ngOnInit(): void {
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
		this.chartOptions3 = {
			data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
			color: this.layoutConfigService.getConfig('colors.state.success'),
			border: 3
		};
		this.chartOptions4 = {
			data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
			color: this.layoutConfigService.getConfig('colors.state.primary'),
			border: 3
		};

		
	}

	getdata(){
		
		this.spinner.show();  
		this.apiservice.post('dashboardOwners','','').subscribe((result) => {               
		this.spinner.hide();     
		var res;
		res=result;
		this.cd.markForCheck();
		
		if( res.status == 1){
          this.TOwner=res.data.length;
		  this.dataSource = new MatTableDataSource(res.data);
		  this.dataSource.paginator = this.paginator;
		  this.dataSource.sort = this.sort;
		  
		//   this.dataSource1 = new MatTableDataSource(res.player);
		//   this.dataSource1.paginator = this.paginator;
		//   this.dataSource1.sort = this.sort;
		//   this.cd.markForCheck();
		 
		}

	  
	  },
	  err => {
		this.spinner.hide();   
		});


		//get players

		this.apiservice.post('dashboardPlayers','','').subscribe((result) => {               
			this.spinner.hide();     
			var res1;
			res1=result;
			this.cd.markForCheck();
			
			if( res1.status == 1){
				this.total_matches=res1.total_matches
			  this.TPlayer=res1.data.length;
			  this.dataSource1 = new MatTableDataSource(res1.data);
			  this.dataSource1.paginator = this.paginator;
			  this.dataSource1.sort = this.sort;
			  this.cd.markForCheck();
			 
			}
	
		  
		  },
		  err => {
			this.spinner.hide();   
			});
	
	}

	////get players

	

}
export interface Element {
  position: number;
  imageurl: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  matches:string;

}
const ELEMENT_DATA: Element[] = [
  
  
];
export interface Element1 {
  position: number;
  imageurl: string;
  name: string;
  email: string;
  phone: string;
  matchesplayed: string;
  
}
const ELEMENT_DATA1: Element1[] =
 [

 ];