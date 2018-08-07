import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router} from '@angular/router';
import { HolidayService } from '../../service/holiday.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-holiday',
  templateUrl: './new-holiday.component.html',
  styleUrls: ['./new-holiday.component.scss']
})
export class NewHolidayComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    holiday = {
		name: '',
        startDate: '',
		endDate: ''
 	}	


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private datePipe: DatePipe,
                private holidayService: HolidayService
             	) { 
		        // Reactive form errors
        this.formErrors = {
            name 			   : {},
            startDate         : {},
            endDate  	   : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		// Reactive Form
        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            startDate  : ['', Validators.required],
            endDate  : ['', Validators.required]
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
    	this.holiday.name = this.form.value.name;
        this.holiday.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
	    this.holiday.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');


		this.holidayService.newHoliday(this.holiday);
		this.router.navigate(['/holidays']);
    }


}
