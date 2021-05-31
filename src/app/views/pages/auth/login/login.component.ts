// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';
/**
 * ! Just example => Should be removed in development
 */
// const DEMO_PARAMS = {
// 	EMAIL: 'admin@demo.com',
// 	PASSWORD: 'demo'
// };

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	password:any;
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
    BASE_URL:any = config.BASE_URL;
	private unsubscribe: Subject<any>;
	userid:any;
	private returnUrl: any;

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		public userService: UserService
	) {
		this.unsubscribe = new Subject();
	}
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	 loginback()
	 {
		 $('.form-login').show();
	 }
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}
	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email
			])
			],
			password: ['', Validators.compose([
				Validators.required
			])
			]
		});
	}
		
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls['email'].value,
			password: controls['password'].value
		};

		this.userService.postData(authData,'admin_login_test').subscribe((result) => {
			this.loading = false;
			if(result.status == 1){
	          this.authNoticeService.setNotice('Logged in successfully!', 'success');

	          localStorage.setItem('user_type',result.data.user_type );
	          localStorage.setItem('userstatus', 'login');

  
	          var userId = this.userService.encryptData(result.data._id,config.ENC_SALT);
	          // this.store.dispatch(new Login({authToken: 'access-token-' +userId}));
    		  localStorage.setItem('apart_admin_auth_token',userId);
    		  localStorage.setItem('apart_admin_name',result.data.name);
    		  localStorage.setItem('apart_admin_email',result.data.email);
    		  localStorage.setItem('apart_admin_image',result.data.image);
    		  localStorage.setItem('apart_admin_phone',result.data.phone);
    		  localStorage.setItem('apart_admin_type',result.data.user_type);
    		  if(localStorage.getItem('user_type') == '3'){
    		  	this.router.navigate(['/panel/appointment']);
    		  }else{
    		  	this.router.navigate(['/panel']);
    		  }
	          
		    }else if(result.status == 3)
		    {
              this.authNoticeService.setNotice('Your account has been deactivated by admin', 'danger');
		    }
		    else{
		        this.authNoticeService.setNotice('Invalid credentials!', 'danger');
		    }
		});
		// this.auth
		// 	.login(authData.email, authData.password)
		// 	.pipe(
		// 		tap(user => {
		// 			if (user) {
		// 				this.store.dispatch(new Login({authToken: user.accessToken}));
		// 				this.router.navigateByUrl(this.returnUrl); // Main page
		// 			} else {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 			}
		// 		}),
		// 		takeUntil(this.unsubscribe),
		// 		finalize(() => {
		// 			this.loading = false;
		// 			this.cdr.markForCheck();
		// 		})
		// 	)
		// 	.subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	 
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
