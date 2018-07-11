import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service'
import { UserService } from '../../service/user.service'
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    userData: any;
	userForEdit: any;
	userId: any;
	positionId:any;
	user = {
		firstName: '',
		lastName: '',
		email: '',
		userTypeId: '',
		teamId: '',
		positionId: ''
	}

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService

             	) { 
		        // Reactive form errors
        this.formErrors = {
            firstName 			   : {},
            lastName  	   : {},
            email   	   : {},
            user_type  : {},
            position  : {},
            team  : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
	    this.userId = this.route.snapshot.params['id'];
	    this.userService.getUserData().subscribe(data => {
	      this.userData = data;
	    });

	    this.userService.getUserById(this.userId).subscribe(r=> {
	    	this.userForEdit = r['user'];
		   	this.form = this._formBuilder.group({

	            firstName : [this.userForEdit.first_name, Validators.required],
	            lastName  : [this.userForEdit.last_name, Validators.required],
	            email   : [this.userForEdit.email, Validators.required],
	            user_type  : [this.userForEdit.user_type.id, Validators.required],
	            position  : [this.userForEdit.position.id, Validators.required],
	            team  : [this.userForEdit.team.id, Validators.required],
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
    	this.user.firstName = this.form.value.firstName;
    	this.user.lastName = this.form.value.lastName;
    	this.user.email = this.form.value.email;
    	this.user.userTypeId = this.form.value.user_type;
    	this.user.positionId = this.form.value.position;
    	this.user.teamId = this.form.value.team;



		this.userService.edit(this.user);
		this.router.navigate(['/users']);
    }


}
