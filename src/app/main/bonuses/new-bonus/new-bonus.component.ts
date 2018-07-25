import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router} from '@angular/router';
import { UserService } from '../../service/user.service';
import { BonusService } from '../../service/bonus.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-bonus',
  templateUrl: './new-bonus.component.html',
  styleUrls: ['./new-bonus.component.scss']
})
export class NewBonusComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    bonus = {
		value: 0,
		date: '',
		userId: 0
 	}	
    users: any;


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private userService: UserService,
                private bonusService: BonusService,
                private datePipe: DatePipe
             	) { 
		        // Reactive form errors
        this.formErrors = {
            value 			   : {},
            date  	   : {},
            user   	   : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		// Reactive Form
        this.form = this._formBuilder.group({

            value : ['', Validators.required],
            user  : ['', Validators.required],
            date   : ['', Validators.required]
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });
  		this.userService.getAllUsersSimple().subscribe((response: any)=> {
  			this.users = response.users;
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
    	this.bonus.value = this.form.value.value;
	    this.bonus.userId = this.form.value.user;
      this.bonus.date = this.datePipe.transform(new Date(this.form.value.date), 'shortDate');

	    this.bonusService.newBonus(this.bonus).subscribe((response: any)=> {
	    	if(response == 'Exists'){
	    		alert('That user already has a bonus');
	    	}else{
				this.router.navigate(['/bonuses']);
			}
	    });
    }




}
