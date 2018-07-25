import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectTypeService } from "../../service/project-type.service";
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.scss']
})
export class ProjectTypeComponent implements OnInit {

  displayedColumns = ['name', 'description'];
  projectTypeId: number = -1;
  projectTypes: any;
  constructor(private projectTypeService: ProjectTypeService) { }

  ngOnInit() {
  	this.getProjectTypes();
  }
  getProjectTypes(){
  	this.projectTypeService.getProjectTypes().subscribe((response: any)=> {
  		this.projectTypes = response.projectTypes;
  	});
  }

    stashInfo(prTypeId){
      if(this.projectTypeId == prTypeId){
        this.projectTypeId = -1;
        let table = document.getElementById(prTypeId);
        table.classList.toggle("active");
      }else if(this.projectTypeId!= -1){
        let id = this.projectTypeId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.projectTypeId = prTypeId;
        let id2 = this.projectTypeId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.projectTypeId = prTypeId;

        let table = document.getElementById(prTypeId);
        table.classList.toggle("active");
      }

       console.log(this.projectTypeId);
    }

    onRemove(){
    	if(this.projectTypeId!= -1 && confirm('Are you sure you want to delete this Project Type?')){
	    	this.projectTypeService.removeProjectType(this.projectTypeId);
	    	this.projectTypeId = -1;
	    	this.getProjectTypes();
	    }
    }
}
