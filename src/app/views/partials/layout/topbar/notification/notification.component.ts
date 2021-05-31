// Angular
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {  ViewChild , OnInit ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { config } from '../../../../../config';
import { UserService } from '../../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
	selector: 'kt-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['notification.component.scss']
})
export class NotificationComponent {
	isLoading = true;
	errors : any = ['',null,undefined];
	loading=false;
	dataSource : any = [];
	unread : any ;
	read_index :any=null;
	IMAGES_URL:any = config.IMAGES_URL;
	// Show dot on top of the icon
	@Input() dot: string;

	// Show pulse on icon
	@Input() pulse: boolean;

	@Input() pulseLight: boolean;

	// Set icon class name
	@Input() icon: string = 'flaticon2-bell-alarm-symbol';
	@Input() iconType: '' | 'success';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() type: 'brand' | 'success' = 'success';

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	constructor(private sanitizer: DomSanitizer,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router) {
		this.getnotifications();
		
	}
	read_notification(id,read,type,index)
	{
	
	    this.read_index=index;
		if(read=='1'){

		}else{
			this.userService.postData({id:id},'read_notifications ').subscribe((result) => {
				if(result.status==1){
					this.unread = Number(this.unread)  - 1;
					this.dataSource[this.read_index]['isRead'] = '1';
				}
			},
			err => {
				this.isLoading = false;
			});
		}	
		if(type=='31')
		{
			//this.router.navigate(['/panel/user-management/']);		
		}else if(type=='32')
		{
			//this.router.navigate(['/panel/user-management/']);	
		}else if(type=='33')
		{
			//this.router.navigate(['/panel/appointment/']);	
		}else
		{
			//this.router.navigate(['/panel/marketplace/']);
		}
		
	}

	getnotifications(){
		this.isLoading = true;
		// this.userService.postData({},'get_admin_notifications').subscribe((result) => {
		// console.log(result);
		// this.dataSource = result.data;
		// this.unread = result.unread;
		
		
		// this.isLoading = false;
		// this.cdr.markForCheck();
		// //this.dataSource.paginator = this.paginator;
		// //this.dataSource.sort = this.sort;
		// },
		// err => {
		// this.isLoading = false;
		// });
	}
	backGroundStyle(): string {
		if (!this.bgImage) {
			return 'none';
		}
		return 'url(' + this.bgImage + ')';
	}
}
