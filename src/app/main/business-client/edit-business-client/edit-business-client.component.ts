import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { BusinessClientService } from '../../service/business-client.service'

@Component({
  selector: 'app-edit-business-client',
  templateUrl: './edit-business-client.component.html',
  styleUrls: ['./edit-business-client.component.scss']
})
export class EditBusinessClientComponent implements OnInit {

	bsnsId: any;
	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    bsnsClient = {
    	businessClientId: 0,
      name: '',
      address: '',
      phoneNumber: '',
      countryId: '',
      zip: '',
      city: '',
      bank: '',
      accountNumber: ''
 	}	
    user: any;
    countryId: any;
    countries: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private businessClientService: BusinessClientService,
                private route: ActivatedRoute
             	) { 
		        // Reactive form errors
        this.formErrors = {
            name  	   : {},
            address   	   : {},
            phoneNumber  : {},
            country  : {},
            zip  : {},
            city  : {},
            bank  : {},
            accountNumber  : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
		this.bsnsId = this.route.snapshot.params['id'];


		this.businessClientService.getBusinessClientById(this.bsnsId).subscribe((response: any) => {
          this.businessClientService.getCountries().subscribe((response: any)=> {
            this.countries= response.countries;
          });
          this.countryId = response.businessClient.city.country.id;
	        this.form = this._formBuilder.group({

	            name  : [response.businessClient.name, Validators.required],
	            address   : [response.businessClient.address, Validators.required],
              phoneNumber  : [response.businessClient.phone_number, Validators.required],
              country  : [response.businessClient.city.country.id, Validators.required],
              zip  : [response.businessClient.city.zip_code, Validators.required],
              city  : [response.businessClient.city.name, Validators.required],
              bank  : [response.businessClient.account.bank, Validators.required],
	            accountNumber  : [response.businessClient.account.account_number, Validators.required]
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
    	this.bsnsClient.name = this.form.value.name;
	    this.bsnsClient.address = this.form.value.address;
      this.bsnsClient.phoneNumber = this.form.value.phoneNumber;
      this.bsnsClient.countryId = this.form.value.country;
      this.bsnsClient.zip = this.form.value.zip;
      this.bsnsClient.city = this.form.value.city;
      this.bsnsClient.bank = this.form.value.bank;
	    this.bsnsClient.accountNumber = this.form.value.accountNumber;
	    this.bsnsClient.businessClientId = this.bsnsId;


		this.businessClientService.editBusinessClient(this.bsnsClient);
        this.router.navigate(['/business-clients']);

		
    }


}
