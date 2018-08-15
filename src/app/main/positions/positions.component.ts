import { Component, OnInit, ViewChild } from '@angular/core';
import { PositionService } from "../service/position.service";
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  displayedColumns = ['name', 'description'];
  positionId: number = -1;
  positions: any;
  constructor(private positionService: PositionService) { }

  ngOnInit() {
  	this.getPositions();
  }
  getPositions(){
  	this.positionService.getPositions().subscribe((response: any)=> {
  		this.positions = response.positions;
  	});
  }

    stashInfo(pstnId){
      if(this.positionId == pstnId){
        this.positionId = -1;
        let table = document.getElementById(pstnId);
        table.classList.toggle("active");
      }else if(this.positionId!= -1){
        let id = this.positionId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.positionId = pstnId;
        let id2 = this.positionId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.positionId = pstnId;

        let table = document.getElementById(pstnId);
        table.classList.toggle("active");
      }

    }

    onRemove(){
    	if(this.positionId!= -1 && confirm('Are you sure you want to delete this Position?')){
	    	this.positionService.removePosition(this.positionId);
	    	this.positionId = -1;
	    	this.getPositions();
	    }
    }

}
