import { Component, OnDestroy, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import { BusinessClientService } from '../../service/business-client.service';
import { DataService } from '../../service/data.service';
import { CompanyService } from '../../service/company.service';
import { InvoiceService } from '../../service/invoice.service';
import { CurrencyService } from '../../service/currency.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

	form: FormGroup;
	formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    invoice: any[]=[];
	businessClients: any;
    companies: any;
    displayedColumns = ['name', 'unit', 'amount', 'priceNoPDV'];
	@ViewChild('table') table;
	data: any[] = [];
	temp: any[] = [];
	serialNumber: number = 0;
    added: boolean = false;
    currencies: any;
    types = ['Domaci', 'Domaci PDV', 'Inostrani'];
    domestic: boolean = false;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
	constructor(private _formBuilder: FormBuilder,
             	private router: Router,
                private datePipe: DatePipe,
                private businessClientService: BusinessClientService,
                private companyService: CompanyService,
                private invoiceService: InvoiceService,
                private changeDetectorRefs: ChangeDetectorRef,
                private dataService: DataService,
                private currencyService: CurrencyService
             	) { 
		        // Reactive form errors
        this.formErrors = {
            businessClient 			   : {},
            name         		       : {},
            unit  	   				   : {},
            amount                     : {},
            slovima                    : {},
            currency                   : {},
            type                       : {},
            paymentMethod              : {},
            paymentDeadline            : {},
            company  	  		       : {},
            priceNoPDV  	   		   : {}
        };

		this._unsubscribeAll = new Subject();

    }

	ngOnInit(): void
	{
        this.currencyService.getCurrencies().subscribe((response: any)=> {
            this.currencies = response.currencies;
        });

        this.companyService.getCompanies().subscribe((response: any)=> {
            this.companies = response;
        });
		// Reactive Form
        this.form = this._formBuilder.group({

            name 			: ['', Validators.required],
            businessClient  : ['', Validators.required],
            unit  			: ['', Validators.required],
            amount          : ['', Validators.required],
            slovima         : ['', Validators.required],
            type            : ['', Validators.required],
            currency        : ['', Validators.required],
            paymentMethod   : ['', Validators.required],
            paymentDeadline : ['', Validators.required],
            company  		: ['', Validators.required],
            priceNoPDV  	: ['', Validators.required]
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();

                if(this.form.value.type == 'Domaci' || this.form.value.type == 'Domaci PDV'){
                    this.domestic = true;
                }else if(this.form.value.type == 'Inostrani'){
                    this.domestic = false;
                }
            });



        this.businessClientService.getBusinessClients().subscribe((response: any)=> {
            this.businessClients = response.businessClients;
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

    onAdd(){
        this.added = true;
    	this.invoice.push(this.form.value);
    	this.table.renderRows();


    	
        let client = this.form.value.businessClient;
        let company = this.form.value.company;
    	let type = this.form.value.type;
        let method = this.form.value.paymentMethod;
        let deadline = this.form.value.paymentDeadline;
        let currency = this.form.value.currency;
    	// this.form.reset();
        this.form = this._formBuilder.group({

            name 			: ['', Validators.required],                    
            businessClient  : [client, Validators.required],
            unit  			: ['', Validators.required],
            amount          : ['', Validators.required],
            type            : [type, Validators.required],
            slovima         : [type, Validators.required],
            paymentMethod   : [method, Validators.required],
            currency        : [currency, Validators.required],
            paymentDeadline : [deadline, Validators.required],
            company  		: [company, Validators.required],
            priceNoPDV  	: ['', Validators.required]
        });

    }

    onInvoice(){
    	this.dataService.addObject(this.invoice);

        let length = this.invoice.length;
        

        this.invoiceService.newInvoice(this.invoice);

        if(this.invoice[length-1].type == 'Domaci PDV'){
    	    this.router.navigate(['/domestic-pdv-invoice']);
        }else if(this.invoice[length-1].type == 'Domaci'){
            this.router.navigate(['/domestic-invoice-']);
        }else if(this.invoice[length-1].type == 'Inostrani'){
            this.router.navigate(['/foreign-invoice']);
        }
    }


}

