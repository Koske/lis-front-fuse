import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectExpenseService } from '../../../service/project-expense.service';
import { ProjectService } from '../../../service/project.service';
import { CurrencyService } from '../../../service/currency.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-new-project-expense',
  templateUrl: './new-project-expense.component.html',
  styleUrls: ['./new-project-expense.component.scss']
})
export class NewProjectExpenseComponent implements OnInit {

	expense: any;
	projects: any[];
	form: FormGroup;
	formErrors: any;	
  currencies: any;
  private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
 	constructor(private _formBuilder: FormBuilder,
                 private projectExpenseService: ProjectExpenseService,
         private projectService: ProjectService,
 				private currencyService: CurrencyService,
 				private router: Router) {
        this.formErrors = {
            description 			   : {},
            amount  	   : {},
            project  	   : {},
            currency: {}
        };

		this._unsubscribeAll = new Subject();
 	 }

  	ngOnInit() {

        this.form = this._formBuilder.group({

            description : ['', Validators.required],
            amount  : ['', Validators.required],
            project  : ['', Validators.required],
            currency  : ['', Validators.required]
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });

        this.projectService.getProjects().subscribe((response: any)=> {
        	this.projects = response;
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

    	this.projectExpenseService.newProjectExpense(this.expense);

    	this.router.navigate(['project-expenses']);
    }
}
