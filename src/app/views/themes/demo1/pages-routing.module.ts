// Angular
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'users',
				loadChildren: () => import('app/views/pages/users/users.module').then(m => m.UsersModule)
			},
			{
				path: 'pages',
				loadChildren: () => import('app/views/pages/pages/pages.module').then(m => m.PagesModule)
			},			
			{
				path: 'matches',
				loadChildren: () => import('app/views/pages/matches/matches.module').then(m => m.MatchesModule)
			},	
			{
				path: 'profile',
				loadChildren: () => import('app/views/pages/profile/profile.module').then(m => m.ProfileModule)
			}	,		
			{
				path: 'builder',
				loadChildren: () => import('app/views/themes/demo1/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
