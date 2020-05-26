import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.scss']
})
export class PlayerMatchesComponent implements OnInit {
  displayedColumns = [ 'select' , 'name', 'playerjoined', 'starttime' , 'endtime' ,'action'];
  displayedColumns1 = [ 'select' ,'name', 'playerjoined', 'startdate' , 'starttime' , 'endtime' ,'action'];
  displayedColumns2 = [ 'select' , 'name', 'playerjoined', 'startdate' , 'starttime' , 'endtime' ,'action'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);
    dataSource2 = new MatTableDataSource<Element2>(ELEMENT_DATA2);
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
  imageurl: string;
  name: string;
  playerjoined: string;
  starttime: string;
  endtime: string;
  }
const ELEMENT_DATA: Element[] = [
  {imageurl:'assets/img/match1.jpg' ,  name: 'Razorbacks', playerjoined: '10 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  {imageurl:'assets/img/match2.jpg' ,   name: 'Fighting Crusadors', playerjoined: '12 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
];
export interface Element1 {
  imageurl: string;
  name: string;  
  startdate: string;

  playerjoined: string;
  starttime: string;
  endtime: string;
  }
const ELEMENT_DATA1: Element1[] = [
  {imageurl:'assets/img/match1.jpg' , startdate:'29 Dec 2019' ,  name: 'Razorbacks', playerjoined: '10 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  
  {imageurl:'assets/img/match2.jpg' , startdate:'29 Dec 2019'  ,  name: 'Fighting Crusadors', playerjoined: '12 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  {imageurl:'assets/img/match1.jpg' , startdate: '29 Dec 2019' ,  name: 'Red Devils', playerjoined: '20 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  {imageurl:'assets/img/match2.jpg' , startdate: '29 Dec 2019' ,  name: 'Fighting Bees', playerjoined: '30 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  {imageurl:'assets/img/match1.jpg' , startdate:'29 Dec 2019' ,  name: 'Razorbacks', playerjoined: '16 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
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
  { location: 'SuperSport Park ,  Centurion' , startdate:'11 Oct 2019' ,  name: 'Razorbacks', playerjoined: '10 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  
  {location: 'SuperSport Park ,  Centurion'  , startdate:'19 Nov 2019'  ,  name: 'Fighting Crusadors', playerjoined: '12 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
  { location: 'SuperSport Park ,  Centurion'  , startdate: '29 Nov 2019' ,  name: 'Red Devils', playerjoined: '20 Joining' , starttime: '05:00 pm' ,  endtime: '07:00 pm'},
];
