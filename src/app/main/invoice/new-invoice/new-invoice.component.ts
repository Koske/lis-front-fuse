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
    invoice: any;
	businessClients: any;
    companies: any;
    displayedColumns = ['name', 'unit', 'amount', 'priceNoPDV'];
	@ViewChild('table') table;
    items: any[]=[];
	data: any[] = [];
	temp: any[] = [];
	serialNumber: number = 0;
    added: boolean = false;
    domesticNoPDV: boolean = false;
    domestic: boolean = false;
    currencies: any;
    types = ['Domaci', 'Domaci PDV', 'Inostrani'];
    toSend = {
        items : [],
        pinfo : '',
        generalInfo : ''
    }
    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;
    verticalStepperStep1Errors: any;
    verticalStepperStep2Errors: any;
    verticalStepperStep3Errors: any;
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

        this.verticalStepperStep1Errors = {
            businessClient                : {},
            type                       : {},
            company                       : {}
        };

        this.verticalStepperStep2Errors = {
            paymentMethod                : {},
            paymentDeadline                       : {},
            currency                       : {},
            slovima                       : {}
        };

        this.verticalStepperStep3Errors = {
            name                : {},
            unit                       : {},
            amount                       : {},
            priceNoPDV                       : {}
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

        // Vertical Stepper form stepper
        this.verticalStepperStep1 = this._formBuilder.group({
            businessClient: ['', Validators.required],
            type : ['', Validators.required],
            company : ['', Validators.required]
        });

        this.verticalStepperStep2 = this._formBuilder.group({
            paymentMethod: ['', Validators.required],
            paymentDeadline: ['', Validators.required],
            currency: ['', Validators.required],
            slovima: ['', Validators.required]
        });

        this.verticalStepperStep3 = this._formBuilder.group({
            name      : ['', Validators.required],
            unit     : ['', Validators.required],
            amount: ['', Validators.required],
            priceNoPDV: ['', Validators.required]
        });

        this.verticalStepperStep1.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
                
                if(this.verticalStepperStep1.value.type == 'Domaci' || this.verticalStepperStep1.value.type == 'Domaci PDV'){
                    if(this.verticalStepperStep1.value.type == 'Domaci'){
                        this.verticalStepperStep2 = this._formBuilder.group({
                            slovima: ['', Validators.required]
                        });
                        this.domestic = true;
                        this.domesticNoPDV = true;
                    }else {
                        this.verticalStepperStep2 = this._formBuilder.group({
                            paymentMethod: ['', Validators.required],
                            paymentDeadline: ['', Validators.required],
                            slovima: ['', Validators.required]
                        });
                        this.domesticNoPDV = false;
                        this.domestic = true;
                    }
                }else if(this.verticalStepperStep1.value.type == 'Inostrani'){
                    this.domesticNoPDV = false;
                    this.domestic = false;
                    this.verticalStepperStep2 = this._formBuilder.group({
                        paymentMethod: ['', Validators.required],
                        paymentDeadline: ['', Validators.required],
                        currency: ['', Validators.required]
                    });
                }
            });

        this.verticalStepperStep2.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });

        this.verticalStepperStep3.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();


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
        this.toSend.generalInfo = (this.verticalStepperStep1.value);
        this.toSend.pinfo = (this.verticalStepperStep2.value);
        this.toSend.items.push(this.verticalStepperStep3.value);
        
        this.items.push(this.verticalStepperStep3.value);
        
        console.log(this.toSend);
    	this.invoice = this.toSend;
        console.log(this.invoice);
    	this.table.renderRows();

        this.verticalStepperStep3.reset();
        this.verticalStepperStep3Errors = {
            name                    : {},
            unit                       : {},
            amount                       : {},
            priceNoPDV                       : {}
        };

    }

    onInvoice(){
    	this.dataService.addObject(this.invoice);        

        this.invoiceService.newInvoice(this.invoice);

        if(this.invoice.generalInfo.type == 'Domaci PDV'){
    	    this.router.navigate(['/domestic-pdv-invoice']);
        }else if(this.invoice.generalInfo.type == 'Domaci'){
            this.router.navigate(['/domestic-invoice']);
        }else if(this.invoice.generalInfo.type == 'Inostrani'){
            this.router.navigate(['/foreign-invoice']);
        }
    }


}

