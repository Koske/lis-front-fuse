import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations : fuseAnimations
})
export class RegistrationComponent implements OnInit, OnDestroy {

	registerForm: FormGroup;
    registerFormErrors: any;
	userData: any;

	user = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		userTypeId: '',
		positionId: '',
		teamId: ''
 	}

	// Private
    private _unsubscribeAll: Subject<any>;
	constructor(private userService: UserService,
				private _fuseConfigService: FuseConfigService,
		        private _formBuilder: FormBuilder) { 
			        // Configure the layout
			        this._fuseConfigService.config = {
			            layout: {
			                navbar : {
			                    hidden: true
			                },
			                toolbar: {
			                    hidden: true
			                },
			                footer : {
			                    hidden: true
			                }
			            }
			        };

			        // Set the defaults
			        this.registerFormErrors = {
			            first_name           : {},
			            last_name           : {},
			            email                : {},
			            password       		 : {},
			            passwordConfirm		 : {},
			            user_type		 : {},
			            position		 : {},
			            team		 : {}
			        };

			        // Set the private defaults
			        this._unsubscribeAll = new Subject();
		        }

	ngOnInit() : void
	{
        this.registerForm = this._formBuilder.group({
            first_name           : ['', Validators.required],
            last_name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]],
            user_type: ['', Validators.required],
            position: ['', Validators.required],
            team: ['', Validators.required]
        });

        this.registerForm.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onRegisterFormValuesChanged();
            });

	    this.userService.getUserData().subscribe(data => {
	      console.log(data);
	      this.userData = data;
	    });
	}

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onRegisterFormValuesChanged(): void
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

	onCreateUser() {

    	this.user.firstName = this.registerForm.value.first_name;
    	this.user.lastName = this.registerForm.value.last_name;
    	this.user.email = this.registerForm.value.email;
    	this.user.password = this.registerForm.value.password;
    	this.user.userTypeId = this.registerForm.value.user_type;
    	this.user.positionId = this.registerForm.value.position;
    	this.user.teamId = this.registerForm.value.team;

	    this.userService.register(this.user);
	    this.registerForm.reset();
	}

}

/**
 * Confirm password
 *
 * @param {AbstractControl} control
 * @returns {{passwordsNotMatch: boolean}}
 */
function confirmPassword(control: AbstractControl): any
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return;
    }

    if ( passwordConfirm.value === '' )
    {
        return;
    }

    if ( password.value !== passwordConfirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
