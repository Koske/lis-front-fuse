import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../service/salary.service'
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {
	salaries: any;
    displayedColumns = ['first_name', 'last_name', 'date_valid', 'bruto', 'neto'];
    salaryId: number= -1;
    netoTotal: number = 0;
    brutoTotal: number = 0;
  	constructor(
                private salaryService: SalaryService,
                private router: Router) { }

  	ngOnInit() {
		this.getSalaries();
  	}

  	getSalaries(){
  		this.salaryService.getSalaries().subscribe((response: any) => {
  			this.salaries = response.salaries;
        this.salaries.forEach((r)=> {
          this.netoTotal += r.neto;
          this.brutoTotal += r.bruto;
        })
        console.log(this.salaries);
  			this.salaries.forEach((r) => {
  				r.date_valid = r.date_valid.substring(0, 10);
  			});
  		});
  	}

    stashInfo(slrId){
      	if(this.salaryId == slrId){
	        this.salaryId = -1;
	        let table = document.getElementById(slrId);
	        table.classList.toggle("active");
      	}else if(this.salaryId!= -1){
	        let id = this.salaryId.toString();
	        let table = document.getElementById(id);
	        table.classList.toggle("active");

	        this.salaryId = slrId;
	        let id2 = this.salaryId.toString();
	        table = document.getElementById(id2);
	        table.classList.toggle("active");
      	}else{
        	this.salaryId = slrId;

	        let table = document.getElementById(slrId);
	        table.classList.toggle("active");
      	}
       console.log(this.salaryId);
    }

  	onRemove(){
    	if(this.salaryId != -1){
      	if(confirm("Are you sure you want to delete this salary?")) {
  				this.salaryService.removeSalary(this.salaryId);
  				this.getSalaries();
			  }
		  }
  	}

    onEdit(){
      this.router.navigate(['/edit-salary', this.salaryId]);
    }
}
