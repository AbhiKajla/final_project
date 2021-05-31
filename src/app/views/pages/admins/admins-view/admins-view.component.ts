import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'kt-admins-view',
  templateUrl: './admins-view.component.html',
  styleUrls: ['./admins-view.component.scss']
})
export class AdminsViewComponent implements OnInit {
	isLoading = true;
  id:any;
	post:any;
	errors : any = ['',null,undefined];
	IMAGES_URL:any = config.IMAGES_URL; 
 constructor(private _snackBar: MatSnackBar,public userService: UserService, private router: Router,public activatedRoute: ActivatedRoute) { 
  this.id = activatedRoute.snapshot.paramMap.get('id');
  this.getData();
  }

  getData(){
  this.userService.postData({id: this.id},'get_single_subadmin_test').subscribe((result) => {
    return this.post=result;
  },
    err => {
    });
  } 
  
  yourFn($event){
    
   }

  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  ngOnInit() {
     
  }

  

}




