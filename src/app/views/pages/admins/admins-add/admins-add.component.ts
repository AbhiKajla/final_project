import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-admins-add',
  templateUrl: './admins-add.component.html',
  styleUrls: ['./admins-add.component.scss']
})
export class AdminsAddComponent implements OnInit {
	is_submit:boolean=false;
	is_license_uploaded:boolean=false;
  is_license_uploaded1:boolean=false;
  is_license_uploaded2:boolean=false;
  is_license_uploaded3:boolean=false;
  is_license_uploaded4:boolean=false;
  is_license_uploaded5:boolean=false;
  is_license_uploaded6:boolean=false;
	loading = false;
	license_error:boolean=false;
	addForm: FormGroup;
	public uploader:FileUploader = new FileUploader({url: ''});
	public hasBaseDropZoneOver:boolean = false;
	timestamp:any;
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
	errors : any = ['',null,undefined];
	password:any;
	confirmpassword:any;
  all_countries:any=[];
  totalpages:number;
	constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, public sanitizer:DomSanitizer,public userService: UserService, private _snackBar: MatSnackBar, private router: Router, private modalService: NgbModal) {
    this.timestamp = new Date().getTime();
    this.getCountries();
    this.totalpages=new Date().getFullYear() - 1939;
  }

	ngOnInit() {
	  this.initAddForm();

    this.addForm.patchValue({
      country_code: '+251',
      dcountry_code: '+251'
    });
    //this.cdr.markForCheck();
	}
	initAddForm(){
    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      user_type: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      password:  ['', Validators.compose([Validators.required])],
      confirmpassword:  ['', Validators.compose([Validators.required])],
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

  getCountries(){
    this.userService.getData('countries').subscribe((result) => {
      this.all_countries = result;
    });
  }

 
  arrayOne(n: number): any[] {
   return Array(n);
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
		if(this.password == this.confirmpassword){
			this.finalSubmit(controls);
		}
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

   
    frmData.append("name", controls['name'].value);
    frmData.append("email", controls['email'].value);  
    frmData.append("phone", controls['phone'].value);  
    frmData.append("user_type", controls['user_type'].value);
    frmData.append("password", controls['password'].value);
      
	
    this.userService.postData(frmData,'add_admins_test').subscribe((result) => { 
        if(result.status == 1){
          
		this.loading = false;

		this.showSnackBar('Admin added successfully');  
		this.addForm.reset();
        this.router.navigate(['/panel/admins/']);		
          
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Email already exist,Please try with another one');
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
        if(type=='profile'){
          self.license_file = image_file;
          self.license_image_url = window.URL.createObjectURL(image_file);
          self.is_license_uploaded = true;
        }
      }
    }
  }

  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }


}
