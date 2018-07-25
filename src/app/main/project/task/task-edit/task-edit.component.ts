import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from "../../../service/project.service";
import { ParticipantService } from "../../../service/participant.service";
import { DatePipe } from '@angular/common';

@Component({
	  selector: 'app-task-edit',
	  templateUrl: './task-edit.component.html',
	  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;

    taskId = {
    	id: 0
    }
    task: any;
    etapeId: any;
    participants: any[] = [];
    taskSend = {
	    name: '',
	    description: '',
	    hour: 0,
	    participant: 0,
	    start: '',
	    id: 0
 	}
	participant: any;
	partParts: any;
	partUser: any;
	participantId: any;
	partName: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
	            private route: ActivatedRoute,
	            private projectService: ProjectService,
	            private router: Router,
	            private participantService: ParticipantService,
                private datePipe: DatePipe) { 
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
		this.taskId = {
    		id: this.route.snapshot.params['id']
   		};
		this.participantService.getParticipantForTask(this.taskId.id).subscribe(
			(response: any) => {

				this.participant = response.participant;
				this.partUser = response.participant.user;
				this.partName = this.partUser.first_name+ " " +this.partUser.last_name;
				this.participantId = response.participant.id;
				this.partParts = response.participant;
				
			});
	  	this.projectService.getTaskById(this.taskId.id).subscribe((response: any) => {
	  		this.task = response;
	  		console.log(this.task);
	  		this.etapeId = this.task.task.etape.id;
	  		this.participantService.getParticipantsForProject(this.etapeId)
		        .subscribe((response: any) => {
		        	this.participants = response.participants;
			        this.form = this._formBuilder.group({

			            name 		 : [this.task.task.name, Validators.required],
			            description  : [this.task.task.description, Validators.required],
			            dateStarted  : [this.task.task.start.slice(0, 10), Validators.required],
			            hour  		 : [this.task.task.hour, Validators.required],
			            participant  : [this.participantId, Validators.required]
			        });

			        this.form.valueChanges
			            .pipe(takeUntil(this._unsubscribeAll))
			            .subscribe(() => {
			                this.onFormValuesChanged();
			            });	        		

	     		});
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


    onSubmit(){
  	    this.taskSend.name = this.form.value.name;
  	    this.taskSend.description = this.form.value.description;
        this.taskSend.start = this.datePipe.transform(new Date(this.form.value.dateStarted), 'shortDate');
  	    this.taskSend.hour = this.form.value.hour;
  	    this.taskSend.participant = this.form.value.participant;
  	    this.taskSend.id = this.taskId.id;
  	    this.projectService.editTask(this.taskSend);
 
	    this.router.navigate(['/projects', this.etapeId, 'etape-details']);
  }

}
