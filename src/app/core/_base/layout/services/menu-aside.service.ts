// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { Observable,Subject, Subscription } from 'rxjs';
import { UserService } from '../../../../core/user/user.service';

@Injectable()
export class MenuAsideService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	subscription: Subscription;
	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	 userType: any = localStorage.getItem('user_type');
	constructor(private menuConfigService: MenuConfigService,public userService: UserService) {
		
		this.loadMenu();
	}

	/**
	 * Load menu list
	 */
	loadMenu() {
		// get menu list
		var menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
		
		
			menuItems = [
					{
						title: 'Dashboard',
						root: true,
						icon: 'flaticon2-architecture-and-city',
						page: 'dashboard',
						translate: 'MENU.DASHBOARD',
						bullet: 'dot',
					},
					
					{
						title: 'Users',
						root: true,
						icon: 'flaticon2-user-outline-symbol',
						page: 'admins'
				
					}
				]	
		this.menuList$.next(menuItems);
	}
}
