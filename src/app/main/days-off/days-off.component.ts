import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http/http.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { DaysOffService } from '../service/days-off.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-days-off',
  templateUrl: './days-off.component.html',
  styleUrls: ['./days-off.component.scss']
})
export class DaysOffComponent implements OnInit {

	daysOff: any;
	daysOffId: number= -1;
    displayedColumns = ['fullName', 'start', 'end'];

  	constructor(private daysOffService: DaysOffService,
                private router: Router) { }

 	ngOnInit() {
 		this.getDaysOff();
  	}

  	getDaysOff(){
  		this.daysOffService.getDaysOff().subscribe((response: any)=> {
  			this.daysOff = response.daysOff;
  			this.daysOff.forEach((r)=> {
  				r.start = r.start.substring(0, 10);
  				r.end = r.end.substring(0, 10);
  			})
  			console.log(this.daysOff);
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
    			this.getDaysOff();
    	}

    }

    onEdit(){
      if(this.daysOffId!= -1){
        this.router.navigate(['edit-days-off', this.daysOffId]);
      }
    }


}
