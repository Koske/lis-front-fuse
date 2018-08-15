import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http/http.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { DaysOffService } from '../service/days-off.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-days-off',
  templateUrl: './days-off.component.html',
  styleUrls: ['./days-off.component.scss']
})
export class DaysOffComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
  	daysOff: any;
  	daysOffId: number= -1;
    displayedColumns = ['fullName', 'start', 'end', 'status'];
    userId: number = -1;
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

    this.userService.getCurrentUser().subscribe((response: any)=> {
      this.userId = response.user.id;
      this.getDaysOff(this.userId);
    });
 		
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

	getDaysOff(id: any){
		this.daysOffService.getDaysOffUser(id).subscribe((response: any)=> {
			this.daysOff = response.dayOff;
			this.daysOff.forEach((r)=> {
				r.start = r.start.substring(0, 10);
				r.end = r.end.substring(0, 10);
			});
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

  onRemove(){
  	if(this.daysOffId){
  		if(confirm('Are you sure you want to delete these days?'))
  			this.daysOffService.removeDaysOff(this.daysOffId);
  			this.daysOffId= -1;
  			this.getDaysOff(this.userId);
  	}

  }

  onEdit(){
    if(this.daysOffId!= -1){
      this.router.navigate(['edit-days-off', this.daysOffId]);
    }
  }

  onReset(){
    this.form.reset();
    this.getDaysOff(this.userId);

    setTimeout(() => {
      this.form.reset();
      this.getDaysOff(this.userId);
    }, 500);
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

      this.daysOffService.filterDaysOff(this.daysOffForm.startDate, this.daysOffForm.endDate, this.daysOffForm.dates, this.userId).subscribe((response: any)=> {
        this.daysOff = response.daysOff;
        this.daysOff.forEach((r)=> {
          r.start = r.start.substring(0, 10);
          r.end = r.end.substring(0, 10);
        });
      });
    }
  }

}
