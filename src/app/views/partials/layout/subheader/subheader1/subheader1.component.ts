// Angular
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
// Layout
import { SubheaderService } from '../../../../../core/_base/layout';
import { Breadcrumb } from '../../../../../core/_base/layout/services/subheader.service';
import { RouterModule,ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

import * as $ from 'jquery';
@Component({
	selector: 'kt-subheader1',
	templateUrl: './subheader1.component.html',
	styleUrls: ['./subheader1.component.scss']
})

export class Subheader1Component implements OnInit, OnDestroy, AfterViewInit {
	// Public properties
	@Input() fluid: boolean;
	@Input() clear: boolean;
	today: number = Date.now();
	title: string = '';
	desc: string = '';
	breadcrumbs: Breadcrumb[] = [];
    text:any;
    html:any;
    url:any;
	type:any;
	user_type = localStorage.getItem('user_type');
	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
	constructor(private router: Router,public subheaderService: SubheaderService,public activatedRoute: ActivatedRoute) {
		this.url=activatedRoute.snapshot['_routerState'].url;
		
		
		if(this.url == "/panel/dashboard"){
		
			this.text='Dashboard';
			$('.html').html('');
          
        }
		else if(this.url == "/panel/admins")
		{
			this.text='All Admins';
			
		}else if(this.url == "/panel/admins/admins-add")
		{
			this.text='Add Admin';
			
		}
		else if(this.url.includes("admins-edit"))
		{
			this.text='Edit Admin';
			
		}else if(this.url.includes("admins-view"))
		{
			this.text='View Admin';	
		}		
		else 
		{
			this.text=='';
		}
		  
		  this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
               
				
            }

            if (event instanceof NavigationEnd) {
                
		this.url=activatedRoute.snapshot['_routerState'].url
		if(this.url == "/panel/dashboard"){
		
			this.text='Dashboard';
			$('.html').html('');
          
        }else if(this.url == "/panel/admins")
		{
			this.text='All Admins';
			
		}else if(this.url == "/panel/admins/admins-add")
		{
			this.text='Add Admin';
			
		}else if(this.url.includes("admins-edit"))
		{
			this.text='Edit Admin';
			
		}else if(this.url.includes("admins-view"))
		{
			this.text='View Admin';
			
		}
		else 
		{
			this.text=='';
		}
            }

            if (event instanceof NavigationError) {
                console.log('error');
                // Present error to user
                console.log(event.error);
            }
        });
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		
	}
	
	check_string(str){
		if(this.url.includes(str)){
			return 0;
		}else{
			return 1;
		}
	}
dashboard()
{
	alert();
	
}
	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		
		this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
			// breadcrumbs title sometimes can be undefined
			if (bt) {
				Promise.resolve(null).then(() => {
					this.title = bt.title;
					this.desc = bt.desc;
				});
			}
		}));

		this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
			Promise.resolve(null).then(() => {
				this.breadcrumbs = bc;
			});
		}));
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
