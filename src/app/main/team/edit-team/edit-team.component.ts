import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeamService } from '../../service/team.service'
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    team = {
    	id:0,
		name: '',
		description: ''
 	}	
 	teamId = 0;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
                private teamService: TeamService,
                private route: ActivatedRoute,
                private router: Router
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


		this.teamId = this.route.snapshot.params['id'];
		

	    this.teamService.getTeamById(this.teamId).subscribe((r:any )=> {
		   	this.form = this._formBuilder.group({

	            name : [r.team.name, Validators.required],
	            description  : [r.team.description, Validators.required]
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
    	this.team.name = this.form.value.name;
	    this.team.description = this.form.value.description;


		this.teamService.editTeam(this.team.name, this.team.description, this.teamId);
		this.router.navigate(['/team']);
    }



}
