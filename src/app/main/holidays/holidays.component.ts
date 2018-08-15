import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayService } from "../service/holiday.service";
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
    
    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
    displayedColumns = ['name', 'startDate', 'endDate'];
    holidayId: number = -1;
    holidays: any;
    holidayForm = {
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
    constructor(private holidayService: HolidayService,
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

  	this.getHolidays();
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
    this.getHolidays();

    setTimeout(() => {
      this.form.reset();
      this.getHolidays();
    }, 500);
  }

  getHolidays(){
  	this.holidayService.getHolidays().subscribe((response: any)=> {
  		response.holidays.forEach((r)=> {
        r.start_date = r.start_date.substring(0, 10);
  			r.end_date = r.end_date.substring(0, 10);
  		});
  		this.holidays = response.holidays;
  	});
  }

    stashInfo(prTypeId){
      if(this.holidayId == prTypeId){
        this.holidayId = -1;
        let table = document.getElementById(prTypeId);
        table.classList.toggle("active");
      }else if(this.holidayId!= -1){
        let id = this.holidayId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.holidayId = prTypeId;
        let id2 = this.holidayId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.holidayId = prTypeId;

        let table = document.getElementById(prTypeId);
        table.classList.toggle("active");
      }

    }

    onRemove(){
    	if(this.holidayId!= -1 && confirm('Are you sure you want to delete this Holiday?')){
    		this.holidayService.removeHoliday(this.holidayId);
    		this.holidayId = -1;
    		this.getHolidays();
	    }
    }

    onFinish(){
      if(this.form.value.dates!= '' && (this.form.value.startDate!= '' || this.form.value.endDate!= '')){
        
        if(this.form.value.startDate){
          this.holidayForm.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
        }else{
          this.holidayForm.startDate = '';
        }
        
        if(this.form.value.endDate){
          this.holidayForm.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');
        }else {
          this.holidayForm.endDate = '';
        }

        this.holidayForm.dates = this.form.value.dates;

        this.holidayService.filterHolidays(this.holidayForm.startDate, this.holidayForm.endDate, this.holidayForm.dates).subscribe((response: any)=> {

          response.holidays.forEach((r)=> {
            r.start_date = r.start_date.substring(0, 10);
            r.end_date = r.end_date.substring(0, 10);
          });
          this.holidays = response.holidays;
        });
      }
    }

}
