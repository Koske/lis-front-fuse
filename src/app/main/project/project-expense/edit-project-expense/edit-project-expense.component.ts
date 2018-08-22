import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectExpenseService } from '../../../service/project-expense.service';
import { ProjectService } from '../../../service/project.service';
import { CurrencyService } from '../../../service/currency.service';

@Component({
  selector: 'app-edit-project-expense',
  templateUrl: './edit-project-expense.component.html',
  styleUrls: ['./edit-project-expense.component.scss']
})
export class EditProjectExpenseComponent implements OnInit {

 	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    expense: any;
 	expenseId: number= -1;
 	projects: any;
   currencies: any;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
 	constructor(private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private projectExpenseService: ProjectExpenseService,
                private currencyService: CurrencyService,
                private projectService: ProjectService) { 

        this.formErrors = {
            amount 			   : {},
            description         : {},
            project       : {},
            currency  	   : {}
        };

		this._unsubscribeAll = new Subject();
 	}

  	ngOnInit() {
  		this.projectService.getProjects().subscribe((response: any)=> {
  			this.projects = response;
  		});
        this.route.params.subscribe((params: Params)=> {
            this.expenseId = params['id'];
	  		this.projectExpenseService.getProjectExpenseById(this.expenseId).subscribe((response: any)=> {
		        this.form = this._formBuilder.group({

		            description : [response.projectExpense.description, Validators.required],
		            amount  : [response.projectExpense.amount, Validators.required],
                project  : [response.projectExpense.project.id, Validators.required],
		            currency  : [response.projectExpense.currency.id, Validators.required],
		        });

		        this.form.valueChanges
		            .pipe(takeUntil(this._unsubscribeAll))
		            .subscribe(() => {
		                this.onFormValuesChanged();
		            });
			  		});
        });
        this.currencyService.getCurrencies().subscribe((response: any)=> {
          this.currencies = response.currencies;
        });
  	}

	ngOnDestroy(): void
	{
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

	    /**
     * On form values changed
     */
    onFormValuesChanged(): void
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

    onFinish(){
    	this.expense = this.form.value;
    	this.expense.id = this.expenseId;
    	this.projectExpenseService.editProjectExpense(this.expense);

      this.router.navigate(['project-expenses']);
    }
}
