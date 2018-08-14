import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../service/salary.service'
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {
	  salaries: any;
    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
    displayedColumns = ['first_name', 'last_name', 'date_valid', 'bruto', 'neto'];
    salaryId: number= -1;
    netoTotal: number = 0;
    brutoTotal: number = 0;
    salaryForm = {
      startDate: '',
      endDate: ''
    }
    clicked: boolean = false;
        /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(
                private salaryService: SalaryService,
                private router: Router,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) {

                    this._unsubscribeAll = new Subject();
 }

  	ngOnInit() {
      this.form = this._formBuilder.group({

          startDate : [''],
          endDate  : ['']
      });

		  this.getSalaries();
  	}

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

  	getSalaries(){
  		this.salaryService.getSalaries().subscribe((response: any) => {
  			this.salaries = response.salaries;
        this.netoTotal = 0;
        this.brutoTotal = 0;
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

    toggleClick(){
      this.clicked = !this.clicked;
    }

    onFinish(){
      if(this.form.value.dates!= '' && (this.form.value.startDate!= '' || this.form.value.endDate!= '')){
        if(this.form.value.startDate){
          this.salaryForm.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
        }else {
          this.salaryForm.startDate = '';
        }
        
        if(this.form.value.endDate){
          this.salaryForm.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');
        }else {
          this.salaryForm.endDate = '';
        }

        this.salaryService.filterSalary(this.salaryForm.startDate, this.salaryForm.endDate).subscribe((response: any)=> {
          this.salaries = response.salaries;
          this.netoTotal = 0;
          this.brutoTotal = 0;
          this.salaries.forEach((r)=> {
            this.netoTotal += r.neto;
            this.brutoTotal += r.bruto;
          })
          this.salaries.forEach((r) => {
            r.date_valid = r.date_valid.substring(0, 10);
          });
        });

      }
    }

    onReset(){
      this.form.reset();
      this.getSalaries();

      setTimeout(() => {
        this.form.reset();
        this.getSalaries();
      }, 500);
    }
}
