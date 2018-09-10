import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { DataService } from '../../service/data.service';
import { BusinessClientService } from '../../service/business-client.service';
import { InvoiceService } from '../../service/invoice.service';
import { CompanyService } from '../../service/company.service';
import { BankService } from '../../service/bank.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-foreign-invoice',
  templateUrl: './foreign-invoice.component.html',
  styleUrls: ['./foreign-invoice.component.scss']
})
export class ForeignInvoiceComponent implements OnInit {

    invoice = {
    	from : {
    		title: '',
    		address: '',
    		PIB: '',
    		MB: '',
    		BA: '',
    		phone: '',
    		email: '',
    		ZCC: '',
    		IBAN: '',
    		web: '',
    	},
        services: [],
        to : {
            title: '',
            address: ''
        },
        totalNoPDV : 0,
        totalPDV: '',
        totalWithPDV: 0,
		currency: { }
    };
    tempService = {
        name: '',
        amount: 0,
        priceNoPDV: 0,
        unit: ''
    }
    foreignToRSD : number = 0;
    totalRSD : number = 0;
    paymentMethod: string = '';
    paymentDeadline: number = 0;
    serialNumber: number = 0;
    currentYear = this.datePipe.transform(new Date(), 'y');
    currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');



    constructor(
                private _fuseConfigService: FuseConfigService,
                private dataService: DataService,
                private bankService: BankService,
                private businessClientService: BusinessClientService,
                private invoiceService: InvoiceService,
                private companyService: CompanyService,
                private datePipe: DatePipe
    )
    {
                    // Configure the layout
                    this._fuseConfigService.config = {
                        layout: {
                            navbar : {
                                hidden: true
                            },
                            toolbar: {
                                hidden: true
                            },
                            footer : {
                                hidden: true
                            }
                        }
                    };
    }

    ngOnInit(): void
    {


        this.dataService.currentObject.subscribe((object: any)=> {
            console.log(object);


            this.paymentMethod = object.pinfo.paymentMethod;
            this.paymentDeadline = object.pinfo.paymentDeadline;
            this.businessClientService.getBusinessClientById(object.generalInfo.businessClient).subscribe((response: any)=> {
                this.invoice.to.title = response.businessClient.name;
                this.invoice.to.address = response.businessClient.address + ', ' + response.businessClient.zip_code + ' ' + response.businessClient.city.country.name;
            });

            this.companyService.getCompanyById(object.generalInfo.company).subscribe((response: any)=> {
                this.invoice.from.title = response.company.name;
                this.invoice.from.address = response.company.address;
                this.invoice.from.web = response.company.web;
                this.invoice.from.PIB = response.company.account.pib;
                this.invoice.from.MB = response.company.firm_id;
                this.invoice.from.ZCC = response.company.city.zip_code + ' ' + response.company.city.name + ', ' + response.company.city.country.name;
                this.invoice.from.BA = response.company.account.account_number + ' ' + response.company.account.bank.name;
                this.invoice.from.phone = response.company.phone;
                this.invoice.from.email = response.company.email;
                this.invoice.from.IBAN = response.company.account.pib;
            });

            let serialNumber = 1;
            object.items.forEach((r: any)=> {
                r.serialNumber = serialNumber;
                r.valueNoPDV = r.amount*r.priceNoPDV;
                r.baseForPDV = r.valueNoPDV;
                r.ratePDV = 20;
                r.valueWithPDV = r.baseForPDV;
                this.invoice.totalNoPDV += r.baseForPDV;
                this.invoice.services.push(r);

                serialNumber++;
            });
            this.invoice.currency = object.pinfo.currency;

	    	this.bankService.getExchangeRate(object.pinfo.currency.code).subscribe((response: any)=> {
	    		this.foreignToRSD = +response;
	    		this.totalRSD = this.invoice.totalNoPDV*(+response);
	    	});
            this.invoice.totalWithPDV = this.invoice.totalNoPDV;
            this.invoiceService.getLastSerialNumber(object).subscribe((response: any)=> {
                this.serialNumber = response;
            });
            console.log(this.invoice);
        });


    }    

    ngOnDestroy(): void
    {

    }

    onPrint(){
    	window.print();

    }
}
