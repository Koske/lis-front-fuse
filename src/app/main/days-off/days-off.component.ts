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
    displayedColumns = ['fullName', 'start', 'end', 'status'];
    userId: number = -1;
  	constructor(private daysOffService: DaysOffService,
                private userService: UserService,
                private router: Router) { }

 	ngOnInit() {
     this.userService.getCurrentUser().subscribe((response: any)=> {
       this.userId = response.user.id;
       this.getDaysOff(this.userId);
     });
 		
  	}

  	getDaysOff(id: any){
  		this.daysOffService.getDaysOffUser(id).subscribe((response: any)=> {
  			this.daysOff = response.dayOff;
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


}
