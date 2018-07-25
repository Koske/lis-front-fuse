import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http/http.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { BonusService } from '../service/bonus.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent implements OnInit {

	  bonuses: any;
	  bonusId: number= -1;
    totalBonuses: number = -1;
    displayedColumns = ['fullName', 'value', 'date', 'date_created', 'date_updated'];

  	constructor(private bonusService: BonusService,
                private router: Router) { }

 	ngOnInit() {
 		this.getBonuses();
  	}

  	getBonuses(){
  		this.bonusService.getBonuses().subscribe((response: any)=> {
  			this.bonuses= response.bonuses;
  			this.bonuses.forEach((r)=> {
  				r.date = r.date.substring(0, 10);
          this.totalBonuses += r.value;
  				r.date_created = r.date_created.substring(0, 10);
  				r.date_updated = r.date_updated.substring(0, 10);
  			});
  		});
  	}

    stashInfo(bnsId){
      if(this.bonusId == bnsId){
        this.bonusId = -1;
        let table = document.getElementById(bnsId);
        table.classList.toggle("active");
      }else if(this.bonusId!= -1){
        let id = this.bonusId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.bonusId = bnsId;
        let id2 = this.bonusId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.bonusId = bnsId;

        let table = document.getElementById(bnsId);
        table.classList.toggle("active");
      }

    }

    onRemove(){
    	if(this.bonusId){
    		if(confirm('Are you sure you want to delete this bonus?'))
    			this.bonusService.removeBonus(this.bonusId);
    			this.bonusId= -1;
    			this.getBonuses();
    	}

    }

    onEdit(){
      this.router.navigate(['edit-bonus', this.bonusId]);

    }

}
