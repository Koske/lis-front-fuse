import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { CountryService } from '../../service/country.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

	form: FormGroup;
	formErrors: any;
	countries: any;	
	companyId: number = -1;
    private _unsubscribeAll: Subject<any>;
    company: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private route: ActivatedRoute,
                private companyService: CompanyService,
                private countryService: CountryService) {
        this.formErrors = {
            name 			   : {},
            address  	   : {},
            country : {},
            phoneNumber   	   : {},
            zip: {},
            city: {},
            email: {},
            web: {},
            firmId: {}

        };

		this._unsubscribeAll = new Subject();

  	}

  	ngOnInit() {
		this.companyId = this.route.snapshot.params['id'];



		this.companyService.getCompanyById(this.companyId).subscribe((response: any)=> {

			this.countryService.getCountries().subscribe((response: any)=> {
				this.countries = response.countries;			
			});

	        this.form = this._formBuilder.group({

	            name : [response.company.name, Validators.required],
	            address  : [response.company.address, Validators.required],
	            country  : [response.company.city.country.id, Validators.required],
	            phoneNumber   : [response.company.phone, Validators.required],
	            zip   : [response.company.city.zip_code, Validators.required],
	            city   : [response.company.city.name, Validators.required],
	            email   : [response.company.email, Validators.required],
	            web   : [response.company.web, Validators.required],
	            firmId   : [response.company.firm_id, Validators.required]
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
    	this.company = this.form.value;
    	this.company.id = this.companyId;
    	this.companyService.editCompany(this.company);

    	this.router.navigate(['/companies']);
    }

}
