import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../service/user.service';
import { BonusService } from '../../service/bonus.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-bonus',
  templateUrl: './edit-bonus.component.html',
  styleUrls: ['./edit-bonus.component.scss']
})
export class EditBonusComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    bonus = {
    	bonusId: 0,
		value: 0,
		date: '',
		userId: 0
 	}	
    users: any;
    bonusId: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private userService: UserService,
                private bonusService: BonusService,
  	            private route: ActivatedRoute,
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
		this.bonusId= this.route.snapshot.params['id'];
		this.bonus.bonusId = this.bonusId;

  		this.userService.getAllUsersSimple().subscribe((response: any)=> {
  			this.users = response.users;
  		});

		this.bonusService.getBonusById(this.bonusId).subscribe((response: any)=> {

			// Reactive Form
	        this.form = this._formBuilder.group({

	            value : [response.bonus.value, Validators.required],
	            user  : [response.bonus.user.id, Validators.required],
	            date   : [response.bonus.date, Validators.required]
	        });

	        this.form.valueChanges
	            .pipe(takeUntil(this._unsubscribeAll))
	            .subscribe(() => {
	                this.onFormValuesChanged();
	            });
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

	    this.bonusService.editBonus(this.bonus);

      this.router.navigate(['/bonuses']);



    }



}
