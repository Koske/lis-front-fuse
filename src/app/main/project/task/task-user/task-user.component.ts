import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from "../../../service/project.service";
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.scss'],
  animations : fuseAnimations
})
export class TaskUserComponent implements OnInit {
  	projectId: any;
  	userId: any;
  	tasks: any;
  	projectName: any;
    constructor(private route: ActivatedRoute,
  	            private router: Router,
    			private projectService: ProjectService) { }

    ngOnInit() {
  	    this.projectId = this.route.snapshot.params['projectId'];
  	    this.userId = this.route.snapshot.params['userId'];
  	    
  	    this.getTasks();
    }

    getTasks(){
  	    this.projectService.getTasksForParticipant(this.projectId, this.userId).subscribe((response: any) => {
  	    	this.tasks = response.tasks;
          console.log(response.tasks);
  	    });
        this.projectService.getProjectById(this.projectId).subscribe((response: any) => {
          this.projectName = response.project.name;
        });
    }

    onFinish(id: any){
    	this.projectService.doneTask(id);
    	this.getTasks();
    } 

}
