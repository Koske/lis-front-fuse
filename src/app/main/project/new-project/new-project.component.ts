import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router} from '@angular/router';
import { ProjectService } from '../../service/project.service'
import { ProjectTypeService } from '../../service/project-type.service'
import { UserService } from '../../service/user.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    project = {
		name: '',
		description: '',
        projectType: 0,
		dateStarted: '',
		estimatedDuration: ''
 	}	
    user: any;
    projectTypes: any;


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private projectService: ProjectService,
                private projectTypeService: ProjectTypeService,
                private userService: UserService,
                private datePipe: DatePipe
             	) { 
		        // Reactive form errors
        this.formErrors = {
            name 			   : {},
            description         : {},
            projectType  	   : {},
            dateStarted   	   : {},
            estimatedDuration  : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
        this.projectTypeService.getProjectTypes().subscribe((response: any)=> {
            this.projectTypes = response.projectTypes;
        });
		// Reactive Form
        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            description  : ['', Validators.required],
            projectType  : ['', Validators.required],
            dateStarted   : ['', Validators.required],
            estimatedDuration  : ['', Validators.required]
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });
        this.userService.getCurrentUser().subscribe((response: any) => {
            this.user = response.user;
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
    	this.project.name = this.form.value.name;
        this.project.description = this.form.value.description;
	    this.project.projectType = this.form.value.projectType;
        this.project.dateStarted = this.datePipe.transform(new Date(this.form.value.dateStarted), 'shortDate');
        this.project.estimatedDuration = this.datePipe.transform(new Date(this.form.value.estimatedDuration), 'shortDate');


		this.projectService.newProject(this.project, this.user);
		this.router.navigate(['/project']);
    }

}
