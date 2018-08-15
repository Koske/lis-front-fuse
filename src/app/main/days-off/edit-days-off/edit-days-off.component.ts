import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../service/user.service';
import { DaysOffService } from '../../service/days-off.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-days-off',
  templateUrl: './edit-days-off.component.html',
  styleUrls: ['./edit-days-off.component.scss']
})
export class EditDaysOffComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    daysOff = {
    	daysOffId: 0,
		start: '',
		end: ''
 	}	
    users: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
             	private route: ActivatedRoute,
                private userService: UserService,
                private daysOffService: DaysOffService,
                private datePipe: DatePipe
             	) { 
		        // Reactive form errors
        this.formErrors = {
            start  	   : {},
            end  	   : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		this.daysOff.daysOffId = this.route.snapshot.params['id'];

		this.daysOffService.getDayOffById(this.daysOff.daysOffId).subscribe((response: any)=> {
	        this.form = this._formBuilder.group({

	            start   : [response.dayOff.start, Validators.required],
	            end   : [response.dayOff.end, Validators.required]
	        });

	        this.form.valueChanges
	            .pipe(takeUntil(this._unsubscribeAll))
	            .subscribe(() => {
	                this.onFormValuesChanged();
	            });
		});
		// Reactive Form



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
      this.daysOff.start = this.datePipe.transform(new Date(this.form.value.start), 'shortDate');
      this.daysOff.end = this.datePipe.transform(new Date(this.form.value.end), 'shortDate');

	    this.daysOffService.editDaysOff(this.daysOff);

	    this.router.navigate(['/days-off']);
    }



}
