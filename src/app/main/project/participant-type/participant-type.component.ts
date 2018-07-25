import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantTypeService } from "../../service/participant-type.service";
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-participant-type',
  templateUrl: './participant-type.component.html',
  styleUrls: ['./participant-type.component.scss']
})
export class ParticipantTypeComponent implements OnInit {

  displayedColumns = ['name', 'description'];
  participantTypeId: number = -1;
  participantTypes: any;
  constructor(private participantTypeService: ParticipantTypeService) { }

  ngOnInit() {
  	this.getParticipantTypes();
  }
  getParticipantTypes(){
  	this.participantTypeService.getParticipantTypes().subscribe((response: any)=> {
  		this.participantTypes = response.participantTypes;
  	});
  }

    stashInfo(prTypeId){
      if(this.participantTypeId == prTypeId){
        this.participantTypeId = -1;
        let table = document.getElementById(prTypeId);
        table.classList.toggle("active");
      }else if(this.participantTypeId!= -1){
        let id = this.participantTypeId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.participantTypeId = prTypeId;
        let id2 = this.participantTypeId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.participantTypeId = prTypeId;

        let table = document.getElementById(prTypeId);
        table.classList.toggle("active");
      }

       console.log(this.participantTypeId);
    }

    onRemove(){
    	if(this.participantTypeId!= -1 && confirm('Are you sure you want to delete this Project Type?')){
	    	this.participantTypeService.removeParticipantType(this.participantTypeId);
	    	this.participantTypeId = -1;
	    	this.getParticipantTypes();
	    }
    }
}
