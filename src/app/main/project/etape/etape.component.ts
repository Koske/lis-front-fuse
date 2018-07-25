import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from '../../service/project.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
	projectId = {
	   id: 0
	}
	etape = {
	   projectId: 0,
	   name: '',
	   description: '',
	   dateStarted: '',
	   dateEnded: ''
	}


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private datePipe: DatePipe
             	) { 
		        // Reactive form errors
        this.formErrors = {
            name 			   : {},
            description  	   : {},
            dateStarted   	   : {},
            dateEnded  : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		this.projectId = {
     		id: this.route.snapshot.params['id']
   		};
		// Reactive Form
        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            description  : ['', Validators.required],
            dateStarted   : ['', Validators.required],
            dateEnded  : ['', Validators.required]
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

 onSubmitEtape(){
   this.etape.name = this.form.value.name;
   this.etape.description = this.form.value.description;
   this.etape.dateStarted = this.datePipe.transform(new Date(this.form.value.dateStarted), 'shortDate');
   this.etape.dateEnded = this.datePipe.transform(new Date(this.form.value.dateEnded), 'shortDate');

   this.etape.projectId = this.projectId.id;

   this.projectService.newEtape(this.etape);

   this.router.navigate(['projects', this.projectId.id, 'details']);


 }

}
