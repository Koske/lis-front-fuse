import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTypeService } from "../../service/user-type.service";
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  displayedColumns = ['name', 'type'];
  userTypeId: number = -1;
  userTypes: any;
  constructor(private userTypeService: UserTypeService) { }

  ngOnInit() {
  	this.getUserTypes();
  }
  getUserTypes(){
  	this.userTypeService.getUserTypes().subscribe((response: any)=> {
  		this.userTypes = response.userTypes;
  	});
  }

    stashInfo(usrTypeId){
      if(this.userTypeId == usrTypeId){
        this.userTypeId = -1;
        let table = document.getElementById(usrTypeId);
        table.classList.toggle("active");
      }else if(this.userTypeId!= -1){
        let id = this.userTypeId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.userTypeId = usrTypeId;
        let id2 = this.userTypeId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.userTypeId = usrTypeId;

        let table = document.getElementById(usrTypeId);
        table.classList.toggle("active");
      }

    }

    onRemove(){
    	if(this.userTypeId!= -1 && confirm('Are you sure you want to delete this User Type?')){
	    	this.userTypeService.removeUserType(this.userTypeId);
	    	this.userTypeId = -1;
	    	this.getUserTypes();
	    }
    }

}
