import { Component, OnInit } from '@angular/core';
import { BusinessClientService } from '../service/business-client.service'
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-business-client',
  templateUrl: './business-client.component.html',
  styleUrls: ['./business-client.component.scss']
})
export class BusinessClientComponent implements OnInit {

    data: any;
   
    displayedColumns = ['name', 'country', 'city', 'address', 'zip', 'phoneNumber', 'bank', 'accountNumber'];
    bsnsId: number= -1;
  	constructor(
                private businessClientService: BusinessClientService,
                private router: Router) { }

  	ngOnInit() {
		this.getSalaries();
  	}

  	getSalaries(){
  		this.businessClientService.getBusinessClients().subscribe((response: any)=> {
        this.data = response.businessClients;
  		});
  	}

    stashInfo(slrId){
      	if(this.bsnsId == slrId){
	        this.bsnsId = -1;
	        let table = document.getElementById(slrId);
	        table.classList.toggle("active");
      	}else if(this.bsnsId!= -1){
	        let id = this.bsnsId.toString();
	        let table = document.getElementById(id);
	        table.classList.toggle("active");

	        this.bsnsId = slrId;
	        let id2 = this.bsnsId.toString();
	        table = document.getElementById(id2);
	        table.classList.toggle("active");
      	}else{
        	this.bsnsId = slrId;

	        let table = document.getElementById(slrId);
	        table.classList.toggle("active");
      	}
       console.log(this.bsnsId);
    }


    onEdit(){
      this.router.navigate(['/edit-business-client', this.bsnsId]);
    }
}
