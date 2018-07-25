import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { BusinessClientService } from '../../service/business-client.service';
@Component({
  selector: 'app-new-business-client',
  templateUrl: './new-business-client.component.html',
  styleUrls: ['./new-business-client.component.scss']
})
export class NewBusinessClientComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    client = {
    	name: '',
		address: '',
		phoneNumber: '',
        country: '',
        zip: '',
        city: '',
        bank: '',
        accountNumber: ''
 	}	
    countries: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private route: ActivatedRoute,
                private businessClientService: BusinessClientService
             	) { 
		        // Reactive form errors
        this.formErrors = {
            name 			   : {},
            address  	   : {},
            country : {},
            phoneNumber   	   : {},
            zip: {},
            city: {},
            bank: {},
            accountNumber: {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		// Reactive Form
        this.businessClientService.getCountries().subscribe((response: any)=> {
            this.countries = response.countries;
        });

        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            address  : ['', Validators.required],
            country  : ['', Validators.required],
            phoneNumber   : ['', Validators.required],
            zip   : ['', Validators.required],
            city   : ['', Validators.required],
            bank   : ['', Validators.required],
            accountNumber   : ['', Validators.required]
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
    	this.client.name = this.form.value.name;
        this.client.address = this.form.value.address;
	    this.client.country = this.form.value.country;
        this.client.phoneNumber = this.form.value.phoneNumber;
        this.client.zip = this.form.value.zip;
        this.client.city = this.form.value.city;
        this.client.bank = this.form.value.bank;
	    this.client.accountNumber = this.form.value.accountNumber;
	    //ovde treba sub zbog provere broja
	    this.businessClientService.newBusinessClient(this.client).subscribe((response: any)=> {
	    	if(response== 'Exists')
	    		alert('A Business Client with that phone number already exists');
            this.router.navigate(['/business-clients']);

	    });

		
    }

}
