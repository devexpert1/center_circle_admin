import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-single-ownermatch',
  templateUrl: './single-ownermatch.component.html',
  styleUrls: ['./single-ownermatch.component.scss']
})
export class SingleOwnermatchComponent implements OnInit {
  displayedColumns = [ 'select' ,  'name', 'playerjoined',  'starttime' , 'endtime' ,'action'];
  displayedColumns1 = [ 'select'  , 'name', 'playerjoined', 'startdate' , 'starttime' , 'endtime' ,'action'];
  displayedColumns2 = [ 'select'  , 'name', 'playerjoined',   'startdate' , 'starttime' , 'endtime' ,'action'];
  displayedColumns3 = [ 'select' ,'plr_image', 'name', 'location'];
  
  
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);
    dataSource2 = new MatTableDataSource<Element2>(ELEMENT_DATA2);
    dataSource3 = new MatTableDataSource<Element3>(ELEMENT_DATA3);
  
      selection = new SelectionModel<Element>(true, []);
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
    constructor(private modalService: NgbModal) { }
  
    ngOnInit() {
    }
  open(content) {
          this.modalService.open(content).result.then((result) => {       
          });
      }
  
  }
  
  export interface Element {
    
    name: string;
    location: string;
    playerjoined: string;
    starttime: string;
    endtime: string;
    }
  const ELEMENT_DATA: Element[] = [
    { location: 'SuperSport Park ,  Centurion' ,  name: 'Razorbacks', playerjoined: '10 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    {location: 'SuperSport Park ,  Centurion' ,  name: 'Fighting Crusadors', playerjoined: '12 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  ];
  
  export interface Element1 {
    name: string;  
    startdate: string;
    location: string; 
    playerjoined: string;
    starttime: string;
    endtime: string;
    }
  const ELEMENT_DATA1: Element1[] = [
    {location: 'SuperSport Park ,  Centurion' , startdate:'29 Dec 2019' ,  name: 'Razorbacks', playerjoined: '10' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    
    {location: 'SuperSport Park ,  Centurion'  , startdate:'29 Dec 2019'  ,  name: 'Fighting Crusadors', playerjoined: '12 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    {location: 'SuperSport Park ,  Centurion'  , startdate: '29 Dec 2019' ,  name: 'Red Devils', playerjoined: '20 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    {location: 'SuperSport Park ,  Centurion'  , startdate: '29 Dec 2019' ,  name: 'Fighting Bees', playerjoined: '30 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    {location: 'SuperSport Park ,  Centurion'  , startdate:'29 Dec 2019' ,  name: 'Razorbacks', playerjoined: '16 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  ];
  
  export interface Element2 {
    name: string;  
    startdate: string;
    location: string; 
    playerjoined: string;
    starttime: string;
    endtime: string;
    }
  const ELEMENT_DATA2: Element2[] = [
    {location: 'SuperSport Park ,  Centurion' , startdate:'11 Oct 2019' ,  name: 'Razorbacks', playerjoined: '10 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    
    {location: 'SuperSport Park ,  Centurion'  , startdate:'19 Nov 2019'  ,  name: 'Fighting Crusadors', playerjoined: '12 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
    {location: 'SuperSport Park ,  Centurion'  , startdate: '29 Nov 2019' ,  name: 'Red Devils', playerjoined: '20 ' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  ];
  
  
  export interface Element3 {
    name: string;  
    location: string; 
    plr_image: string;
    }
  const ELEMENT_DATA3: Element3[] = [
    {plr_image:'assets/img/plr1.jpg', name: 'Jason Statham' , location:'Miami'},
    {plr_image:'assets/img/plr2.jpg', name: 'Luda Chris' , location:'Florida'},
    {plr_image:'assets/img/plr3.jpg', name: 'Eminem' , location:'Miami'},
    {plr_image:'assets/img/plr4.jpg', name: 'Robert Downy ' , location:'Florida'},
    {plr_image:'assets/img/plr5.jpg', name: 'Albert Rhode ' , location:'Miami'},
  
  ];