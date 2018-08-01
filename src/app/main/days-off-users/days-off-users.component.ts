import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http/http.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { DaysOffService } from '../service/days-off.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms'

@Component({
  selector: 'app-days-off-users',
  templateUrl: './days-off-users.component.html',
  styleUrls: ['./days-off-users.component.scss']
})
export class DaysOffUsersComponent implements OnInit {

	daysOff: any ;
	daysOffId: number= -1;
  dates: any;
    displayedColumns = ['fullName', 'daysOff'];
    userId: number = -1;
    clicked: boolean = false;
  	constructor(private daysOffService: DaysOffService,
                private userService: UserService,
                private router: Router) { }

 	ngOnInit() {
 		this.getDaysOffStats();
  	}

  	getDaysOffStats(){
	     this.daysOffService.getDaysOffStats().subscribe((response: any)=> {
	     	this.daysOff = response.daysOffStats;
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

    calendar(id, i){
      if(this.clicked){
        this.router.navigate(['days-off-per']);
        this.getDaysOffStats();
      }else{
        this.router.navigate(['days-off-per', id, 'calendar']);
        console.log(this.daysOff);
        let temp = this.daysOff[i];
       // this.daysOff.splice(1);
        this.daysOff = [];
        this.daysOff.push(temp);
        console.log(this.daysOff);

        console.log(i);
      }
        this.clicked = !this.clicked;
    }

}