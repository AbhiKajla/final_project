import { Component, ViewChild , OnInit,ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { UserService } from '../../../core/user/user.service';
import { config } from '../../../config';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: string;
  phone: string;
  action: string;
  created: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'kt-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
isLoading = true;
errors : any = ['',null,undefined];
modalRef:any;
del_id:any=null;
del_index:any=null;
status_index:any=null;
status_aid:any=null;
status_val:any=null;
loading=false;
IMAGES_URL:any = config.IMAGES_URL;
displayedColumns: string[] = ['position1','position', 'email', 'phone', 'created', 'action'];
dataSource : any = [];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor( private _snackBar: MatSnackBar,public userService: UserService,private modalService: NgbModal, private cdr: ChangeDetectorRef) {
 this.getSubadmin();

 console.log('admins panel calls');

  	  }

  ngOnInit() {
  this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  del_open(content,del_id,del_index) {
    this.modalRef = this.modalService.open(content);
    this.del_id = del_id;
    this.del_index = del_index;
  }
  confirm_delete(){
    this.loading = true;
    this.userService.postData({id:this.del_id},'delete_admins_test').subscribe((result) => {
      this.loading = false;
	 
      if(result.status == 1){
        this.modalRef.close();
        this.dataSource.data.splice(this.del_index,1);
        this.cdr.markForCheck();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSnackBar('Admin deleted successfully.');
      }
      else{
        this.showSnackBar('Error while deleting admin,Please try after some time');
      }
    },
    err => {
      this.loading = false;
      this.showSnackBar('Technical error,Please try after some time');
    });
  }
  getSubadmin(){
  	this.isLoading = true;
    this.userService.postData({},'get_all_admins_test').subscribe((result) => {
    	console.log(result);
    this.dataSource = new MatTableDataSource(result);
    this.isLoading = false;
    this.cdr.markForCheck();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },
    err => {
    this.isLoading = false;
    });
  }

  st_open(content,st_aid,status,i) {
    this.modalRef = this.modalService.open(content);
    this.status_index=i;
    this.status_aid=st_aid;
    this.status_val=status;
  }

  confirm_approve()
  {
    this.loading = true;
    var dict = {
      driverId:this.status_aid,
      status:this.status_val
    }
    this.userService.postData(dict,'update_admin_status_test').subscribe((result) => {
    this.loading = false;
    if(result.status == 1){
    this.modalRef.close();
    
    this.dataSource.data[this.status_index]['status'] = this.status_val;
    this.cdr.markForCheck(); 
    if(this.status_val=='1')
    {
    this.showSnackBar('Active Successfully.');
    }else
    {
    this.showSnackBar('Inactive Successfully.'); 
    }
    }
    },
    err => {
    this.isLoading = false;
    });
  }
}