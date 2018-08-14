import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http/http.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { DaysOffService } from '../service/days-off.service';
import { ActivatedRoute, Router} from '@angular/router';
import { DialogDeclinedDayOffComponent } from '../dialog-declined-day-off/dialog-declined-day-off.component'
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-days-off-request',
  templateUrl: './days-off-request.component.html',
  styleUrls: ['./days-off-request.component.scss']
})
export class DaysOffRequestComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
	  daysOff: any;
	  daysOffId: number = -1;
    displayedColumns = ['fullName', 'start', 'end', 'status'];
    decision = {
    	dayOffId: 0,
    	status: '',
    	reasonDeclined: ''
    }
    reasons: any;
    daysOffForm = {
      startDate: '',
      endDate: '',
      dates: ''
    }
    clicked: boolean = false;
    dates = [
      {value: 'unixStartDate', viewValue: 'Start Date'},
      {value: 'unixEndDate', viewValue: 'End Date'}
    ];

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(private daysOffService: DaysOffService,
                private userService: UserService,
                private router: Router,
                private dialog: MatDialog,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) { 
    this._unsubscribeAll = new Subject();

    }

 	ngOnInit() {

    this.form = this._formBuilder.group({
        startDate : [''],
        endDate  : [''],
        dates : ['']
    });

    this.getDaysOff();
    
 		
  	}

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

    toggleClick(){
      this.clicked = !this.clicked;
    }


  onReset(){
    this.form.reset();
    this.getDaysOff();

    setTimeout(() => {
      this.form.reset();
      this.getDaysOff();
    }, 500);
  }

  	getDaysOff(){
  		this.daysOffService.getDaysOff().subscribe((response: any)=> {
  			this.daysOff = response.daysOff;
  			this.daysOff.forEach((r)=> {
  				r.start = r.start.substring(0, 10);
  				r.end = r.end.substring(0, 10);
  					
  			})
  		});
  	}

    stashInfo(dysOffId){
      if(this.daysOffId == dysOffId){
        this.daysOffId = -1;
        let table = document.getElementById(dysOffId);
        table.classList.toggle("active");
      }else if(this.daysOffId!= -1){
        let id = this.daysOffId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.daysOffId = dysOffId;
        let id2 = this.daysOffId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.daysOffId = dysOffId;

        let table = document.getElementById(dysOffId);
        table.classList.toggle("active");
      }

    }
    openDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(DialogDeclinedDayOffComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
          data => {
       		  	let id2 = this.daysOffId.toString();

                let table = document.getElementById(id2);
                table.classList.toggle("active");
                if(data){
		   			this.decision.dayOffId = this.daysOffId;
		    		this.decision.status = 'Declined';
		    		this.decision.reasonDeclined = data.reason;
		    		this.daysOffService.decisionDaysOff(this.decision);
                }
	    		this.daysOffId = -1;
	    		this.getDaysOff();
          }
        );
    }

    onApprove(){
    	if(this.daysOffId && confirm('Are you sure you want to approve these days?')){
    		this.decision.dayOffId = this.daysOffId;
    		this.decision.status = 'Approved';
    		this.daysOffId = -1;
    		this.decision.reasonDeclined = '';
    		this.daysOffService.decisionDaysOff(this.decision);
    		this.getDaysOff();
    			
    	}

    }

    onDecline(){
      if(this.daysOffId!= -1 ){
 		    this.openDialog();
      }
    }

    onFinish(){
      if(this.form.value.dates!= '' && (this.form.value.startDate!= '' || this.form.value.endDate!= '')){
        
        if(this.form.value.startDate){
          this.daysOffForm.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
        }else{
          this.daysOffForm.startDate = '';
        }
        
        if(this.form.value.endDate){
          this.daysOffForm.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');
        }else {
          this.daysOffForm.endDate = '';
        }

        this.daysOffForm.dates = this.form.value.dates;

        this.daysOffService.filterDaysOff(this.daysOffForm.startDate, this.daysOffForm.endDate, this.daysOffForm.dates, null).subscribe((response: any)=> {
          console.log(response);
          this.daysOff = response.daysOff;
          this.daysOff.forEach((r)=> {
            r.start = r.start.substring(0, 10);
            r.end = r.end.substring(0, 10);
          });
        });
      }
    }

}
