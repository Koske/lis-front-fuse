import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from "../../../service/project.service";

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent implements OnInit {
  	projectId: any;
  	userId: any;
  	tasks: any[] = [];
    constructor(private route: ActivatedRoute,
  	            private router: Router,
    			private projectService: ProjectService) { }

    ngOnInit() {
  	    this.projectId = this.route.snapshot.params['projectId'];
  	    this.userId = this.route.snapshot.params['userId'];
  	    
  	    this.projectService.getTasksForParticipant(this.projectId, this.userId).subscribe((response: any) => {
  	    	this.tasks = response;
  	    	console.log(this.tasks);
  	    });
    } 

}
