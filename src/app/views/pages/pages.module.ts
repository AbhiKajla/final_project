// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';// Partials
import { PartialsModule } from '../partials/partials.module';// Pages
import { CoreModule } from '../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [],
	exports: [],
	imports: [
	
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		NgbModule.forRoot(),
	],
	providers: []
})
export class PagesModule {
}
