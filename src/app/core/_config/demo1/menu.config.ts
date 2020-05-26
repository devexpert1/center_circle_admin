export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: []
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},	
                 {
					title: 'Owners',
					root: true,
					icon: 'flaticon2-user-outline-symbol',
					page: 'users',
					bullet: 'dot',
				},
                 {
					title: 'Players',
					root: true,
					icon: 'icon-footbal-play',
					page: 'users/players',
					bullet: 'dot',
				},	
                 {
					title: 'Matches',
					root: true,
					icon: 'flaticon-trophy',
					page: 'matches',
					bullet: 'dot',
				},
				{
					title: 'Teams',
					root: true,
					icon: 'flaticon-trophy',
					page: 'users/teams',
					bullet: 'dot',
				},

                 {
					title: 'Profile',
					root: true,
					icon: 'flaticon-user',
					page: 'profile',
					bullet: 'dot',
				},		
				// {
				// 	title: 'Logout',
				// 	root: true,
				// 	icon: 'flaticon-lock',
				// 	page: '',
				// 	bullet: 'dot',
				// },					
				/*{
					title: 'Users',
					root: true,
					bullet: 'dot',
					page: 'users',
					icon: 'flaticon2-user-outline-symbol',
					 submenu: [
						{
							title: 'Owners',
							page: 'users'
						},
						{
							title: 'Players',
							page: 'users/players'
						}
					]
				}*//*,				
				{
					title: 'Pages',
					root: true,
					bullet: 'dot',
					page: 'pages',
					icon: 'flaticon-file-2',
                    submenu: [
						{
							title: 'Manage Pages',
							page: 'pages'
						}
					]
				},*/
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
