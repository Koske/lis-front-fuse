import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { InvoiceItemService } from '../service/invoice-item.service';
import { CompanyService } from '../service/company.service';
import { BusinessClientService } from '../service/business-client.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  	displayedColumns = ['type', 'company', 'business_client', 'date'];
    formErrors: any;  
    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
    invoiceId: number = -1;
    invoices: any[]=[];
    clicked: boolean = false;
    businessClients: any[] = [];
    companies: any[] = [];
    toSend: any;
    applied: boolean = false;
    types = ['Domaci', 'Domaci PDV', 'Inostrani'];
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(private invoiceService: InvoiceService,
  				private businessClientService: BusinessClientService,
  				private invoiceItemService: InvoiceItemService,
  				private companyService: CompanyService,
  				private router: Router,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) {
        this._unsubscribeAll = new Subject();
  	}

  	ngOnInit() {
	    this.form = this._formBuilder.group({

	        startDate : [null],
	        endDate  : [null],
	        company  : [null],
	        businessClient  : [null],
	        type: [null]
	    });

	    this.businessClientService.getBusinessClients().subscribe((response: any)=> {
	    	this.businessClients = response.businessClients;
	    });

	    this.companyService.getCompanies().subscribe((response: any)=> {
	    	this.companies = response;
	    });

	    this.getInvoices();
  	}

  	getInvoices(){
  		this.invoiceService.getInvoices().subscribe((response: any)=> {
        response.forEach((r: any)=> {
          r.date_created = r.date_created.substring(0, 10);
        });
  			this.invoices = response;
  		});
  	}

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

    stashInfo(invId){
      if(this.invoiceId == invId){
        this.invoiceId = -1;
        let table = document.getElementById(invId);
        table.classList.toggle("active");
      }else if(this.invoiceId!= -1){
        let id = this.invoiceId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.invoiceId = invId;
        let id2 = this.invoiceId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.invoiceId = invId;

        let table = document.getElementById(invId);
        table.classList.toggle("active");
      }
    }

    onReset(){
    	this.form.reset();
      this.applied = false;
    	this.getInvoices();
    }

    toggleClick(){
      this.clicked = !this.clicked;
    }

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

    onApply(){
      this.applied = true;
    	this.toSend = this.form.value;

    	if(this.toSend.startDate!= null)
    		this.toSend.startDate = this.datePipe.transform(new Date(this.toSend.startDate), 'shortDate');
    	if(this.toSend.endDate!= null)
    		this.toSend.endDate = this.datePipe.transform(new Date(this.toSend.endDate), 'shortDate');
    	
    	console.log(this.toSend);
    	this.invoiceService.filterInvoices(this.form.value).subscribe((response: any)=> {
    		response.invoices.forEach((r: any)=> {
    			r.date_created = r.date_created.substring(0, 10);
    		});
    		this.invoices = response.invoices;
    	});
    }

    onDetails(){
      if(this.invoiceId!= -1)
    	  this.router.navigate(['/invoice-item', this.invoiceId]);
    }



    onRemove(){
      if(confirm('Are you sure you want to delete this invoice?') && this.invoiceId!= -1){
        this.invoiceService.removeInvoice(this.invoiceId);
        this.invoiceId = -1;
        if(this.applied == true){
          setTimeout(()=> {
            this.onApply()
          }, 2000);
        }else{
          this.getInvoices();
        }
      }
    }
}
