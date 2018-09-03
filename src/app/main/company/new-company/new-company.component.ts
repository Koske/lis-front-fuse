import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { CountryService } from '../../service/country.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

	form: FormGroup;
	formErrors: any;
	countries: any;	
    private _unsubscribeAll: Subject<any>;
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

  	ngOnInit(): void 
  	{
  		this.countryService.getCountries().subscribe((response: any)=> {
  			this.countries = response.countries;
  		});

        this.form = this._formBuilder.group({

            name : ['', Validators.required],
            address  : ['', Validators.required],
            country  : ['', Validators.required],
            phoneNumber   : ['', Validators.required],
            zip   : ['', Validators.required],
            city   : ['', Validators.required],
            email   : ['', Validators.required],
            web   : ['', Validators.required],
            firmId   : ['', Validators.required]
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
    	this.companyService.newCompany(this.form.value);
      this.router.navigate(['/companies']);
    }
}
