import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { HttpService } from "../../http/http.service";
import { ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from "../../service/project.service";
import { ParticipantService } from "../../service/participant.service";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  	form: FormGroup;
  	formErrors: any;	
    private _unsubscribeAll: Subject<any>;

  	task = {
    	  etapeId: 0,
    	  name: '',
    	  description: '',
    	  dateStarted: new Date(),
    	  hour: 0,
    	  participant: 0
   	}
  	etapeId = {
     		id: 0
   	}
   	participants: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(private httpService: HttpService,
  				      private _formBuilder: FormBuilder,
  	            private route: ActivatedRoute,
  	            private projectService: ProjectService,
  	            private router: Router,
  	            private participantService: ParticipantService)
    { 
  		  this.formErrors = {
            name 			   : {},
            description  	   : {},
            dateStarted   	   : {},
            hour  			   : {},
            participant		   : {}
    		};
  			this._unsubscribeAll = new Subject();
  	}
 
  	ngOnInit() : void
  	{
  	    this.etapeId = {
    	 	    id: this.route.snapshot.params['id']
  	    };

  	    this.participantService.getParticipantsForProject(this.etapeId.id)
  	        .subscribe((response: any) => {
  	         	this.participants = response.participants;
  	    });
        this.form = this._formBuilder.group({
            name : ['', Validators.required],
            description  : ['', Validators.required],
            dateStarted   : ['', Validators.required],
            hour  : ['', Validators.required],
            participant  : ['', Validators.required]
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


    onSubmitTask(){
  	    this.task.name = this.form.value.name;
  	    this.task.description = this.form.value.description;
  	    this.task.dateStarted = new Date(this.form.value.dateStarted);
  	    this.task.hour = this.form.value.hour;
  	    this.task.etapeId = this.etapeId.id;
  	    this.task.participant = this.form.value.participant;
  	    this.projectService.newTask(this.task);

  	    this.router.navigate(['projects', this.etapeId.id, 'etape-details']);
    }

}
