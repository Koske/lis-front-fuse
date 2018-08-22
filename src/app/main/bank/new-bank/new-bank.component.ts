import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-new-bank',
  templateUrl: './new-bank.component.html',
  styleUrls: ['./new-bank.component.scss']
})
export class NewBankComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;


        /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
 	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private route: ActivatedRoute,
                private bankService: BankService) { 
        this.formErrors = {
            name 			   : {},
            swift  	   : {}
        };

		this._unsubscribeAll = new Subject();
 	}

  	ngOnInit() {


        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            swift  : ['', Validators.required]
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
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
    	this.bankService.newBank(this.form.value);

    	this.router.navigate(['/banks']);
    }

}
