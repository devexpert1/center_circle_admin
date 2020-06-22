import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxStarsModule } from 'ngx-stars';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
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
	MatSnackBarModule,
	MatTooltipModule
	
} from '@angular/material';
import { PlayersComponent } from './players/players.component';
import { AddplayersComponent } from './addplayers/addplayers.component';
import { EditplayersComponent } from './editplayers/editplayers.component';
import { OwnerMatchesComponent } from './owner-matches/owner-matches.component';
import { PlayerMatchesComponent } from './player-matches/player-matches.component';
import { SingleOwnermatchComponent } from './single-ownermatch/single-ownermatch.component';
import { AgmCoreModule } from '@agm/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TeamsComponent } from './teams/teams.component';
import { VotesComponent } from './votes/votes.component';
import { MytransactionsComponent } from './mytransactions/mytransactions.component';
@NgModule({
  declarations: [UsersComponent, AdduserComponent, EdituserComponent, PlayersComponent, AddplayersComponent, EditplayersComponent, OwnerMatchesComponent, PlayerMatchesComponent, SingleOwnermatchComponent, TeamsComponent, VotesComponent, MytransactionsComponent],
  imports: [
	OwlDateTimeModule, 
	OwlNativeDateTimeModule,
    CommonModule,
	NgbModule,
	FormsModule,
	NgxSpinnerModule,
	Ng4GeoautocompleteModule.forRoot(),
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
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		NgxStarsModule,
		MatButtonToggleModule,
	   RouterModule.forChild([
			{
				path: '',
				component: UsersComponent
			},
			{
				path: 'adduser',
				component: AdduserComponent
			},
			{
				path: 'edituser/:id',
				component: EdituserComponent
			},
			{
				path: 'players', 
				component: PlayersComponent
			},
			{
				path: 'addplayers',
				component: AddplayersComponent
			},
			{
				path: 'editplayers/:id',
				component: EditplayersComponent
			},
			{
				path: 'owner-matches',
				component: OwnerMatchesComponent
			},	
			{
				path: 'player-matches',
				component: PlayerMatchesComponent
			},{
				path: 'single-ownermatch',
				component: SingleOwnermatchComponent
			}
			,{
				path: 'teams',
				component: TeamsComponent
			}
			,{
				path: 'votes',
				component: VotesComponent
			},	
				
		   {
				path: 'mytransactions',
				component: MytransactionsComponent
			},	
					
			
		]),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAIkAmlsGxoP63HLptMlKqpbgAv7IZBKM4',
			libraries: ['places']
		  })  ]
})
export class UsersModule { }
