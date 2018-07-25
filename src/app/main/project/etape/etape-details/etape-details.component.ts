import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from "../../../http/http.service";
import { ProjectService } from "../../../service/project.service";
import { MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-etape-details',
  templateUrl: './etape-details.component.html',
  styleUrls: ['./etape-details.component.scss']
})
export class EtapeDetailsComponent implements OnInit {


 	constructor(private route: ActivatedRoute,
             	private httpService: HttpService,
             	private router: Router,
            	 private projectService: ProjectService) { }
    displayedColumns = ['name', 'description','participant', 'start', 'end', 'hour', 'finished'];
    projectName: string;
    etapeName: string;
    etapeStart: string;
    etapeEnd: string;
    etapeDescription: string;
	etapeId = {
	   id: 0
	}
	tasks: any[] ;
	taskId: number = -1;
 	ngOnInit() {
   		this.etapeId = {
     		id: this.route.snapshot.params['id']
   		};

   		this.getTasks();
 	}
 	getTasks(){
 		this.projectService.getEtapeById(this.etapeId.id).subscribe((response: any)=> {
 			this.projectName = response.etape.project.name;
 			this.etapeName = response.etape.name;
 			this.etapeEnd = response.etape.end;
 			this.etapeStart = response.etape.start;
 			this.etapeDescription = response.etape.description;
 		});
 		this.projectService.getTaskByEtape(this.etapeId.id)
	        .subscribe((response: any) => {
		        	for(let el of response.tasks){
		        		el.start = el.start.substring(0, 10);
		        		el.finished = false;
		        		if(el.end){
		        			el.end = el.end.substring(0, 10) + ' '+ el.end.substring(11, 16);
		        			el.finished = true;
		        		}
		        	}
		       		this.tasks = response.tasks;
	       		
	    });
 	}
    onAddTask(){
    	this.router.navigate(['/projects', this.etapeId.id, 'task']);
    }

    onEdit(){
    	this.router.navigate(['/projects', this.etapeId.id, 'edit-etape']);
    }

    stashInfo(tskId){
	    if(this.taskId == tskId){
		    this.taskId = -1;
		    let table = document.getElementById(tskId);
		    table.classList.toggle("active");
	    }
	    else if(this.taskId!= -1){
		    let id = this.taskId.toString();
		    let table = document.getElementById(id);
		    table.classList.toggle("active");

		    this.taskId = tskId;
		    let id2 = this.taskId.toString();
		    table = document.getElementById(id2);
		    table.classList.toggle("active");
	    }
	    else{
		    this.taskId = tskId;

		    let table = document.getElementById(tskId);
		    table.classList.toggle("active");
	    }
 	}

 	onDone(){
 		if(this.taskId!= -1){
		    this.projectService.doneTask(this.taskId);
		    this.getTasks();
		}
    }
    onEditTask(){
    	if(this.taskId!= -1)
    		this.router.navigate(['/projects', this.taskId, 'edit-task']);
    }

    onRemove(){
    	if(this.taskId!= -1){
    		if(confirm("Do you really want to delete this task?")){
    			this.projectService.removeTask(this.taskId);
    			this.taskId = -1;
    			this.getTasks();
    		}
    	}
    }

}
