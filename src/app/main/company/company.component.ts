import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service'
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    data: any;
   
    displayedColumns = ['name', 'city', 'address', 'firmId', 'phoneNumber', 'bank'];
    companyId: number= -1;

  	constructor(private companyService: CompanyService,
                private router: Router) { }

  	ngOnInit() {
  		this.getCompanies();
  	}

  	getCompanies(){
  		this.companyService.getCompanies().subscribe((response: any)=> {
  			this.data = response;
  		});
  	}

    stashInfo(cmpId){
      	if(this.companyId == cmpId){
	        this.companyId = -1;
	        let table = document.getElementById(cmpId);
	        table.classList.toggle("active");
      	}else if(this.companyId!= -1){
	        let id = this.companyId.toString();
	        let table = document.getElementById(id);
	        table.classList.toggle("active");

	        this.companyId = cmpId;
	        let id2 = this.companyId.toString();
	        table = document.getElementById(id2);
	        table.classList.toggle("active");
      	}else{
        	this.companyId = cmpId;

	        let table = document.getElementById(cmpId);
	        table.classList.toggle("active");
      	}
    }

    onEdit(){
    	if(this.companyId!= -1)
      		this.router.navigate(['/edit-company', this.companyId]);
    }

    onRemove(){
      if(this.companyId!= -1 && confirm("Do you want to delete this Company?")){
        this.companyService.removeCompany(this.companyId);
        this.getCompanies();
      }
    }
}
