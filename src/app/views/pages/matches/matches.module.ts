import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
	
} from '@angular/material';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchResultsComponent } from './match-results/match-results.component';
import { AddmatchComponent } from './addmatch/addmatch.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [MatchesComponent, MatchDetailComponent, MatchResultsComponent, AddmatchComponent],
  imports: [

	AgmCoreModule.forRoot({
		apiKey: 'AIzaSyAIkAmlsGxoP63HLptMlKqpbgAv7IZBKM4',
		libraries: ['places']
	  }) ,
		CommonModule,
		Ng4GeoautocompleteModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		NgxMaterialTimepickerModule,
		MatTabsModule,
		NgxSpinnerModule,
		MatTooltipModule,
		MatDialogModule,
	  RouterModule.forChild([
			{
				path: '',
				component: MatchesComponent
			},
			{
				path: 'match-detail/:_id',
				component: MatchDetailComponent
			},
			{
				path: 'match-results/:_id',
				component: MatchResultsComponent
			},
			{
				path: 'addmatch/:_id',
				component: AddmatchComponent
			}

		])
  ]
})
export class MatchesModule { }
