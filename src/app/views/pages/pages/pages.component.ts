import { Component, ViewChild , OnInit } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
@Component({
  selector: 'kt-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  displayedColumns = [  'title', 'date', 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  
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
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  title: string;
  date: string;
}
const ELEMENT_DATA: Element[] = [
  {title: ' Home ', date: 'Aug 17, 2019'}
];
