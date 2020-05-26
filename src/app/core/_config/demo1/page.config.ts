export class PageConfig {
	public defaults: any = {
		dashboard: {
		     page: {title: 'Dashboard', desc: ''},
			},
			users: {
		     page: {title: 'Owners', desc: ''},
			'adduser': {page: {title: 'Add Owner', desc: ''}},
			'edituser': {page: {title: 'Edit Owner', desc: ''}},
			'players': {page: {title: 'Players', desc: ''}},
			'addplayers': {page: {title: 'Add Player', desc: ''}},
			'editplayers': {page: {title: 'Edit Player', desc: ''}},
			'owner-matches': {page: {title: 'Matches List', desc: ''}},
			'player-matches': {page: {title: 'Matches Played', desc: ''}},
			}, 
		  pages: {
			page: {title: 'Pages', desc: ''},
				'add-page': {page: {title: 'Add Page', desc: ''}},
				'edit-page': {page: {title: 'Edit Page', desc: ''}},
				
			},
			matches: {
			  page: {title: 'Matches', desc: ''},
				'match-detail': {page: {title: 'Match Detail', desc: ''}},
				'match-results': {page: {title: 'Match Results', desc: ''}},

			}	,	
			profile: {
			  page: {title: 'My Profile', desc: ''},				
			}	,
		builder: {
			page: {title: 'Layout Builder', desc: ''}
		},
		// header: {
			// actions: {
				// page: {title: 'Actions', desc: 'Actions example page'}
			// }
		// },
	};

	public get configs(): any {
		return this.defaults;
	}
}
