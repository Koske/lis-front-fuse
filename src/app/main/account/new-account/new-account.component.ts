import { Component, OnInit } from '@angular/core';
import { BankService } from '../../service/bank.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { AccountService } from '../../service/account.service';
import { BusinessClientService } from '../../service/business-client.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
   
	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
   	types = [
      {value: 'Devizni'},
      {value: 'Dinarski'}
    ];
    banks: any;
    businessClients: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(private bankService: BankService,
                private businessClientService: BusinessClientService,
  				      private _formBuilder: FormBuilder,
             	  private router: Router,
                private route: ActivatedRoute,
                private accountService: AccountService) {
        
        this.formErrors = {
            type 			   : {},
            accountNumber  	   : {},
            bank: {},
            businessClient: {}
        };

		this._unsubscribeAll = new Subject();
                 }

  	ngOnInit() {
  		this.bankService.getAllBanks().subscribe((response: any)=> {
  			this.banks = response.banks
  		});

      this.businessClientService.getBusinessClients().subscribe((response: any)=> {
        this.businessClients = response.businessClients;
      });

        this.form = this._formBuilder.group({

            type : ['', Validators.required],
            accountNumber  : ['', Validators.required],
            bank  : ['', Validators.required],
            businessClient  : ['', Validators.required]
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
    	this.accountService.newAccount(this.form.value);

      this.router.navigate(['/accounts']);
    }

}
