import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayService } from "../service/holiday.service";
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  displayedColumns = ['name', 'startDate', 'endDate'];
  holidayId: number = -1;
  holidays: any;

  constructor(private holidayService: HolidayService) { }

  ngOnInit() {
  	this.getHolidays();
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

       console.log(this.holidayId);
    }

    onRemove(){
    	if(this.holidayId!= -1 && confirm('Are you sure you want to delete this Holiday?')){
    		this.holidayService.removeHoliday(this.holidayId);
    		this.holidayId = -1;
    		this.getHolidays();
	    }
    }

}
