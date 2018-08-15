import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { ReportService } from "../service/report.service";

import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
    animations : fuseAnimations
})
export class ReportComponent implements OnInit
{



    constructor(private datePipe: DatePipe,
      			private route: ActivatedRoute,
      			private reportService: ReportService,
      			private router: Router){}
    currentYear: any;
    currentMonth= "";
    userId: any;
    firstName: any;
    lastName: any;
    mrs: String;
    info: any;

    ngOnInit(){
	  	this.userId = {
	     id: this.route.snapshot.params['id']
	    };
	  	this.currentYear = this.datePipe.transform(new Date(), "y");
	  	this.currentMonth = this.datePipe.transform(new Date(), "m");

	  	this.reportService.getInitialInfo(this.userId, this.currentYear, this.currentMonth).subscribe((response: any) => {
	  		this.firstName = response.user.first_name;
	  		this.lastName = response.user.last_name;
	  		this.info = response.months;
	  	});
    }

    minusYear(){
  	this.currentYear--;

  	this.reportService.getInitialInfo(this.userId, this.currentYear, this.currentMonth).subscribe((response: any) => {
  		this.info = response.months;
  	});
  }

  plusYear(){
  	this.currentYear++;

  	this.reportService.getInitialInfo(this.userId, this.currentYear, this.currentMonth).subscribe((response: any) => {
  		this.info = response.months;
  	});
  }

  onMonth(month: string){
      switch(month){
          case 'January':
              this.router.navigate(['/report', this.userId.id, 1, this.currentYear]);
              break;
          case 'February':
              this.router.navigate(['/report', this.userId.id, 2, this.currentYear]);
              break;
          case 'March':
              this.router.navigate(['/report', this.userId.id, 3, this.currentYear]);
              break;
          case 'April':
              this.router.navigate(['/report', this.userId.id, 4, this.currentYear]);
              break;
          case 'May':
              this.router.navigate(['/report', this.userId.id, 5, this.currentYear]);
              break;
          case 'June':
              this.router.navigate(['/report', this.userId.id, 6, this.currentYear]);
              break;
          case 'July':
              this.router.navigate(['/report', this.userId.id, 7, this.currentYear]);
              break;
          case 'August':
              this.router.navigate(['/report', this.userId.id, 8, this.currentYear]);
              break;
          case 'September':
              this.router.navigate(['/report', this.userId.id, 9, this.currentYear]);
              break;
          case 'October':
              this.router.navigate(['/report', this.userId.id, 10, this.currentYear]);
              break;
          case 'November':
              this.router.navigate(['/report', this.userId.id, 11, this.currentYear]);
              break;
          case 'December':
              this.router.navigate(['/report', this.userId.id, 12, this.currentYear]);
              break;
      }
  }

  onEditHistory(){
    this.router.navigate(['/edit-presence-report', this.userId.id]);
  }
}
