import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { ProjectTypeService } from '../../service/project-type.service';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

 	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    project = {
    	id:0,
		name: '',
        projectType: 0,
		description: '',
		dateStarted: '',
		estimatedDuration: ''
 	}	
 	 projectId = {
  		id: 0
 	}
 	ai: any;

 	ress: any;
 	rese: any;
     projectTypes: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
                private projectService: ProjectService,
                private projectTypeService: ProjectTypeService,
                private route: ActivatedRoute,
                private router: Router,
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

		this.projectId = {
		 id: this.route.snapshot.params['id'],
		};
	    this.project.id = this.projectId.id;

	    this.projectService.getProjectById(this.projectId.id).subscribe((r:any )=> {
	   	this.form = this._formBuilder.group({

            name : [r.project.name, Validators.required],
            description  : [r.project.description, Validators.required],
            projectType  : [r.project.project_type.id, Validators.required],
            dateStarted   : [r.start, Validators.required],
            estimatedDuration  : [r.end, Validators.required]
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
    	this.project.name = this.form.value.name;
        this.project.description = this.form.value.description;
	    this.project.projectType = this.form.value.projectType;
        this.project.dateStarted = this.datePipe.transform(new Date(this.form.value.dateStarted), 'shortDate');
        this.project.estimatedDuration = this.datePipe.transform(new Date(this.form.value.estimatedDuration), 'shortDate');



		this.projectService.editProjects(this.project);
		this.router.navigate(['/project']);
    }

}


