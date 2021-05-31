// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
import { Router,ActivatedRoute ,NavigationEnd} from '@angular/router';
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';

import { DatePipe } from '@angular/common';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	datePipeString : string;
	constructor(private datePipe: DatePipe, private layoutConfigService: LayoutConfigService, private router: Router) {
		this.datePipeString = datePipe.transform(Date.now(),'dd-MM-yyyy');
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
		  return false;
		};
		
	}
	ngOnInit() {
	}
}