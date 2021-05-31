// Angular
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import { config } from '../../../../../config';
import { UserService } from '../../../../../core/user/user.service';
import { Router } from '@angular/router';
@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;
	name:any;
	image:any;
	isLoggedIn:boolean;
	userId:any;
	errors : any = ['',null,undefined,'undefined','null'];
	IMAGES_URL:any = config.IMAGES_URL;
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor( private cdr: ChangeDetectorRef, private store: Store<AppState>, public userService: UserService, private router: Router) {
		var token = localStorage.getItem('apart_admin_auth_token');
	    this.userId = this.userService.decryptData(token,config.ENC_SALT);
		
	    this.checkUserToken();
		/* this.events.subscribe('edit_profile:true',function(data){
			console.log(data);
		}); */
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.name = localStorage.getItem('apart_admin_name');
	  	this.image = localStorage.getItem('apart_admin_image');
	}

	checkUserToken(){
	  	this.userService.postData({userId: this.userId},'check_admin_token').subscribe((result) => {
	  		if(result.status == 1){
	  			this.isLoggedIn = true;
	  		}
	  		else{
	  			this.userId = 0;
	  			this.isLoggedIn = false;
	  		}
	  		this.cdr.markForCheck();
	  	});
	}

	/**
	 * Log out
	 */
	setstore()
	 {
	  //localStorage.setItem('user_type','admin');
	 }
	logout() {
		this.userId = 0;
	  	this.isLoggedIn = false;
	  	localStorage.setItem('userstatus', 'login');
	  	localStorage.removeItem('apart_admin_auth_token');
	    localStorage.removeItem('apart_admin_name');
	    localStorage.removeItem('apart_admin_image');
	  	localStorage.removeItem('apart_admin_phone');
	  	localStorage.removeItem('apart_admin_email');
	  	this.router.navigate(['/']);
	}
}
