import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { AdminsAddComponent } from './admins-add/admins-add.component';
import { AdminsEditComponent } from './admins-edit/admins-edit.component';
import { AdminsViewComponent } from './admins-view/admins-view.component';
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
	
} from '@angular/material';
import { FileUploadModule } from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminsComponent, AdminsAddComponent, AdminsEditComponent, AdminsViewComponent],
  imports: [
    CommonModule,
		MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MatSnackBarModule,
	MatTooltipModule,
	FormsModule,
    ReactiveFormsModule,
	FileUploadModule,
	  RouterModule.forChild([
			{
				path: '',
				component: AdminsComponent
			},
			{
				path: 'admins-add',
				component: AdminsAddComponent
			},
			{
				path: 'admins-edit/:id/:type',
				component: AdminsEditComponent
			},
			{
				path: 'admins-view/:id',
				component: AdminsViewComponent
			}
		])
  ]
})
export class AdminsModule { }
