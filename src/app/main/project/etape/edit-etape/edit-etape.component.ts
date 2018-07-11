import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../../service/project.service'

@Component({
  selector: 'app-edit-etape',
  templateUrl: './edit-etape.component.html',
  styleUrls: ['./edit-etape.component.scss']
})
export class EditEtapeComponent implements OnInit {

 	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
	etapeId = {
	   id: 0
	}
	etape = {
	    id: 0,
	    name: '',
	    description: '',
	    dateStarted: new Date(),
		dateEnded: new Date()
	}
 	ai: any;

 	ress: any;
 	rese: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router
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


		this.etapeId = {
		 id: this.route.snapshot.params['id'],
		};
	   this.etape.id = this.etapeId.id;
	   // this.projectService.getProjects()
	   //   .subscribe((response: any) => {
	   //     for(let el of response){
	   //       if(el.id == this.projectId.id){
	   //         this.ai = el;
	   //         let strStart = this.ai.start_date;
	   //         this.ress = strStart.slice(0, 10);
			 //   let strEnd = this.ai.estimated_duration;
	   //         this.rese = strEnd.slice(0, 10);
	           
	   //       }
	   //       }

	   //   });
	   this.projectService.getEtapeById(this.etapeId.id).subscribe((r:any )=> {
	   	console.log(r);
	   	this.form = this._formBuilder.group({

            name : [r.etape.name, Validators.required],
            description  : [r.etape.description, Validators.required],
            dateStarted   : [r.etape.start.substring(0, 10), Validators.required],
            dateEnded  : [r.etape.end.substring(0, 10), Validators.required]
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

  	onSubmitEtape(){
	  	this.etape.name = this.form.value.name;
	  	this.etape.description = this.form.value.description;
	  	this.etape.dateStarted = this.form.value.dateStarted;
	  	this.etape.dateEnded = this.form.value.dateEnded;
	  	this.etape.id = this.etapeId.id;
		this.projectService.editEtape(this.etape);
	  	this.router.navigate(['/projects', this.etapeId.id, 'etape-details']);
  	}

}


