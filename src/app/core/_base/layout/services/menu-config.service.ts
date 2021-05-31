// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Observable,Subject, Subscription } from 'rxjs';
import { UserService } from '../../../../core/user/user.service';
@Injectable()
export class MenuConfigService {
	// Public properties
	onConfigUpdated$: Subject<any>;
	// Private properties
	private menuConfig: any;
	public userType: any = '1';
	subscription: Subscription;
	/**
	 * Service Constructor
	 */
	constructor(public userService: UserService) {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
		console.log(this.onConfigUpdated$)
		 
	}


	
	/**
	 * Returns the menuConfig
	 */
	getMenus() {
		return this.menuConfig;
	}

	

	/**
	 * Load config
	 *
	 * @param config: any
	 */
	loadConfigs(config: any) {
		 

		 if(localStorage.getItem('user_type') === '3'){
				var item = {
					self: {},
					items: [	
						{
							title: 'Request Fulfillment',
							root: true,
							bullet: 'dot',
							page: 'appointment',
							icon: 'fa fa-building'
						}
					]
				};

				config.aside = item;
				this.menuConfig = config;
			}else if(localStorage.getItem('user_type') === '1'){
				this.menuConfig = config;
			}

			
			
			this.onConfigUpdated$.next(this.menuConfig);
			console.log('menu', this.menuConfig)
		
	}
}
