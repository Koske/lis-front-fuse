import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeamService } from '../../service/team.service'

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

	teamId: any;
	users: any;
    userId: number = -1;
	displayedColumns = ['first_name', 'last_name', 'email', 'user_type', 'position'];

    constructor(	private route: ActivatedRoute,
              		private router: Router,
              		private teamService: TeamService
              		) { }

	ngOnInit() {
		this.teamId = this.route.snapshot.params['id'];
		this.getUsersForTeam();

	}

	getUsersForTeam(){
		this.teamService.getUsersForTeam(this.teamId).subscribe((response: any) => {
			this.users = response.users;
			console.log(this.users);
		});
	}
	stashInfo(userId){
	    if(this.userId == userId){
	      this.userId = -1;
	      let table = document.getElementById(userId);
	      table.classList.toggle("active");
	    }
	    else if(this.userId!= -1){
	      let id = this.userId.toString();
	      let table = document.getElementById(id);
	      table.classList.toggle("active");
	      this.userId = userId;
	      let id2 = this.userId.toString();
	      table = document.getElementById(id2);
	      table.classList.toggle("active");
	    }
	    else{
	      this.userId = userId;
	      let table = document.getElementById(userId);
	      table.classList.toggle("active");
	    }
	 
	    console.log(this.userId);
	}

	onRemove(){
		if(this.userId!= -1){
      		if(confirm("Are you sure to remove this user?")) {
				this.teamService.removeFromTeam(this.userId);
				this.userId = -1;
				this.getUsersForTeam();
			}	
		}
	}
}
