import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router} from '@angular/router';
import { TeamService } from '../../service/team.service'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    team = {
		name: '',
		description: ''
 	}	


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private teamService: TeamService,
                private userService: UserService
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
    	this.team.name = this.form.value.name;
	    this.team.description = this.form.value.description;


		this.teamService.newTeam(this.team.name, this.team.description);
		this.form.reset();
    }

}
