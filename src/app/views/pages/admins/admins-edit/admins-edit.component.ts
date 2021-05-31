// Angular
import { Component, OnInit, OnDestroy ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../core/reducers';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubheaderService, LayoutConfigService } from '../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud';
import * as $ from 'jquery';
@Component({
  selector: 'kt-admins-edit',
  templateUrl: './admins-edit.component.html',
  styleUrls: ['./admins-edit.component.scss']
})
export class AdminsEditComponent implements OnInit {
is_license_uploaded:boolean=false;
is_license_uploaded1:boolean=false;
  is_license_uploaded2:boolean=false;
  is_license_uploaded3:boolean=false;
  is_license_uploaded4:boolean=false;
  is_license_uploaded5:boolean=false;
  is_license_uploaded6:boolean=false;
		id:any;
		type:any;
		pass:any;
		errors : any = ['',null,undefined];
		post:any;
		license_error:boolean=false;
		IMAGES_URL:any = config.IMAGES_URL;
		isLoading = true;
		is_submit:boolean=false;
		loading = false;
		password:any;
		confirmpassword:any;
		allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
		license_file:any;
    license_file1:any;
    license_file2:any;
    license_file3:any;
    license_file4:any;
    license_file5:any;
    license_file6:any;
		license_image_url:any;
    license_image_url1:any;
    license_image_url2:any;
    license_image_url3:any;
    license_image_url4:any;
    license_image_url5:any;
    license_image_url6:any;
		all_images:any=[];
		images1:any=[];
		deleted_images:any=[];
		deleted_files:any=[];
		selectedTab: number = 0;
		loading$: Observable<boolean>;
		public uploader:FileUploader = new FileUploader({url: ''});
		public hasBaseDropZoneOver:boolean = false;
		addForm: FormGroup;
		changeForm: FormGroup;
    all_countries:[];
  allVehicles:[];
  allMakes:any=[];
  totalpages:number;

		constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, public sanitizer:DomSanitizer,public userService: UserService, private _snackBar: MatSnackBar, private router: Router,public activatedRoute: ActivatedRoute) {
		this.id = activatedRoute.snapshot.paramMap.get('id');
		this.type = activatedRoute.snapshot.paramMap.get('type'); 
		
		this.getData();
    this.getCountries();
    this.totalpages=new Date().getFullYear() - 1939;
		this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
        }

            if (event instanceof NavigationEnd) {
            this.id = activatedRoute.snapshot.paramMap.get('id');
			this.type = activatedRoute.snapshot.paramMap.get('type');  
			this.getData();
            }

            if (event instanceof NavigationError) {
               
                console.log(event.error);
            }
        });
	
			}

		ngOnInit() {
		this.initAddForm();
    this.addForm.patchValue({
      country_code: '+251',
      dcountry_code: '+251'
    });
  //  this.cdr.markForCheck();
		}

		initAddForm(){
    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      user_type: ['', Validators.compose([Validators.required])],
    });


    this.changeForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.required])]
     
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.addForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
   isControlHasError1(controlName: string, validationType: string): boolean {
    const control = this.changeForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getCountries(){
    this.userService.getData('countries').subscribe((result) => {
      this.all_countries = result;
    });
  }

  

  arrayOne(n: number): any[] {
   return Array(n);
  }

  submit1() {
  
    this.is_submit = true;
    const controls = this.changeForm.controls;
    if (this.changeForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    else{
    if(this.password == this.confirmpassword){
      this.finalSubmit1(controls);
    }
      
    }

  }
  
submit() {
    this.is_submit = true;
    const controls = this.addForm.controls;
    if (this.addForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    else{
      this.finalSubmit(controls);
    }

  }

  finalSubmit(controls){
    this.loading = true;
    const frmData = new FormData();  
    if(this.license_file=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file);  
  }

  if(this.license_file1=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file1);  
  }

  if(this.license_file2=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file2);  
  }

  if(this.license_file3=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file3);  
  }

  if(this.license_file4=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file4);  
  }

  if(this.license_file5=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file5);  
  }

  if(this.license_file6=='')
  {
    frmData.append("file", "");
  }else{
  frmData.append("file", this.license_file6);  
  }
  
    frmData.append("name", controls['name'].value);
    frmData.append("email", controls['email'].value);  
    frmData.append("phone", controls['phone'].value);  
    frmData.append("user_type", controls['user_type'].value);
    frmData.append("id", this.id);
   
  
    this.userService.postData(frmData,'edit_admins_test').subscribe((result) => { 
        if(result.status == 1){
    this.loading = false;
    
    this.showSnackBar('Admin updated successfully'); 
    this.addForm.reset();
        this.router.navigate(['/panel/admins/']);
      
          
        } else if(result.status == 2){
        this.showSnackBar('Email already exists!');
      }
        else{
          this.loading = false;
          this.showSnackBar('Error while adding admin,Please try after some time');
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
  }
     
  uploadLicense(event,type){
   
    this.license_error = false;
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var image_file = event.target.files[0];
      image_file.action=type;
      if(self.allowedMimes.indexOf(image_file.type) == -1){
        this.license_error = true;
      }
      else{
        console.log('type is');
        console.log(type);
        if(type=='profile'){
          self.license_file = image_file;
          self.license_image_url = window.URL.createObjectURL(image_file);
          self.is_license_uploaded = true;
        }
      }
    }
  }

   finalSubmit1(controls){
	
    this.loading = true;
   var dict = {
    password:controls['password'].value,
    id:this.id
	}
	
    this.userService.postData(dict,'reset_admins_password_test').subscribe((result) => {   
    
        if(result.status == 1){
		this.loading = false;
		this.showSnackBar('Admin Password updated successfully');  
		this.changeForm.reset();
        this.router.navigate(['/panel/admins/']);		
        } 
        else{
          this.loading = false;
          this.showSnackBar('Error while updating password ,Please try after some time');
		  this.addForm.reset();
        this.router.navigate(['/panel/admins/']);	
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
  }  
  
  getData(){
		this.userService.postData({id: this.id},'get_single_subadmin_test').subscribe((result) => {
		this.post=result;
		this.images1=result.images;
		this.isLoading = false;
		this.addForm.patchValue({
			name: this.post.name,
			phone: this.post.phone,
			email: this.post.email,
      user_type: this.post.user_type,
		});
	    this.isLoading = false;
    this.cdr.markForCheck();
		},
		err => {
		this.isLoading = false;
		});
	}
	showSnackBar(message){
    	this._snackBar.open(message, 'Close', {
      	duration: 3000,
    	});
  	}
}
