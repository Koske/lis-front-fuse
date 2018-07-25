import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from '../../service/project.service'
import { SalaryService } from '../../service/salary.service'
import { UserService } from '../../service/user.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-salary',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.scss']
})
export class EditSalaryComponent implements OnInit {
	salaryId: any;
	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    salary = {
    	id: 0,
    	userId: 0,
		bruto: 0,
		neto: 0,
		dateValid: ''
 	}	
    user: any;
    users: any;
    userId: any;


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private projectService: ProjectService,
                private userService: UserService,
                private salaryService: SalaryService,
                private route: ActivatedRoute,
                private datePipe: DatePipe
             	) { 
		        // Reactive form errors
        this.formErrors = {
            user 			   : {},
            bruto  	   : {},
            neto   	   : {},
            dateValid  : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		this.salaryId = this.route.snapshot.params['id'];
		// Reactive Form
		this.userService.getAllUsersSimple().subscribe((response: any) => {
			this.users = response.users;
			console.log(this.users);
		});

		this.salaryService.getSalaryById(this.salaryId).subscribe((response: any) => {
			this.userId = response.salary.user.id;
	        this.form = this._formBuilder.group({

	            user : [this.userId, Validators.required],
	            bruto  : [response.salary.bruto, Validators.required],
	            neto   : [response.salary.neto, Validators.required],
	            dateValid  : [response.salary.date_valid, Validators.required]
	        });

	        this.form.valueChanges
	            .pipe(takeUntil(this._unsubscribeAll))
	            .subscribe(() => {
	                this.onFormValuesChanged();
	            });
		});

        this.userService.getCurrentUser().subscribe((response: any) => {
            this.user = response.user;
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
    	this.salary.bruto = this.form.value.bruto;
	    this.salary.neto = this.form.value.neto;
        this.salary.dateValid = this.datePipe.transform(new Date(this.form.value.dateValid), 'shortDate');
	    this.salary.userId = this.form.value.user;
	    this.salary.id = this.salaryId;

		this.salaryService.editSalary(this.salary);
        this.router.navigate(['/salaries']);

		
    }


}

