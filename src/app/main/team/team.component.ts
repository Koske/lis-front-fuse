import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    displayedColumns = ['name', 'description'];
	teams: any;
	teamId: number = -1;
    constructor(private teamService: TeamService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
	  	this.getTeams();
    }
    getTeams(){
	  	this.teamService.getTeams().subscribe((response: any) => {
	  		this.teams = response.teams;
	  	});
    }
    stashInfo(prId){
      if(this.teamId == prId){
        this.teamId = -1;
        let table = document.getElementById(prId);
        table.classList.toggle("active");
      }else if(this.teamId!= -1){
        let id = this.teamId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.teamId = prId;
        let id2 = this.teamId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.teamId = prId;

        let table = document.getElementById(prId);
        table.classList.toggle("active");
      }

       console.log(this.teamId);
    }

    onRemove(){
        if(this.teamId != -1){
        	if(confirm("Are you sure you want to delete this team?")) {
    			this.teamService.removeTeam(this.teamId);
    			this.getTeams();
    		}
    	}
    }

    onEdit(){
        this.router.navigate(['/edit-team', this.teamId]);

    }

    onDetails(){
        this.router.navigate(['/team-details', this.teamId]);
    }
}
