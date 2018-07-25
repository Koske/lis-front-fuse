import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router} from '@angular/router';
import { ProjectTypeService } from '../../../service/project-type.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-project-type',
  templateUrl: './new-project-type.component.html',
  styleUrls: ['./new-project-type.component.scss']
})
export class NewProjectTypeComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    projectType = {
		name: '',
		description: ''
 	}	
    user: any;


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private datePipe: DatePipe,
                private projectTypeService: ProjectTypeService
             	) { 
		        // Reactive form errors
        this.formErrors = {
            name 			   : {},
            description  	   : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		// Reactive Form
        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            description  : ['', Validators.required]
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
    	this.projectType.name = this.form.value.name;
	    this.projectType.description = this.form.value.description;


		this.projectTypeService.newProjectType(this.projectType);
		this.router.navigate(['/project-types']);
    }


}
