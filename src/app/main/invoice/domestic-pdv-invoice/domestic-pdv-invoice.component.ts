import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { DataService } from '../../service/data.service';
import { BusinessClientService } from '../../service/business-client.service';
import { InvoiceService } from '../../service/invoice.service';
import { CompanyService } from '../../service/company.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-domestic-pdv-invoice',
  templateUrl: './domestic-pdv-invoice.component.html',
  styleUrls: ['./domestic-pdv-invoice.component.scss']
})
export class DomesticPdvInvoiceComponent implements OnInit {
    invoice = {
    	from : {
    		title: '',
    		address: '',
    		PIB: '',
    		MB: '',
    		BA: '',
    		phone: '',
    		email: ''
    	},
        services: [],
        to : {
            PIB: '',
            phone: '',
            BA: '',
            fax: ''
        },
        totalNoPDV : 0,
        totalPDV: '',
        totalWithPDV: 0
    };
    tempService = {
        name: '',
        amount: 0,
        priceNoPDV: 0,
        unit: ''
    }
    paymentMethod: string = '';
    paymentDeadline: number = 0;
    serialNumber: number = 0;
    currentYear = this.datePipe.transform(new Date(), 'y');
    currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');



    constructor(
                private _fuseConfigService: FuseConfigService,
                private dataService: DataService,
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
                this.invoice.to.BA = response.businessClient.account.account_number;
                this.invoice.to.PIB = response.businessClient.account.pib;
                this.invoice.to.phone = response.businessClient.phone_number;
            });

            this.companyService.getCompanyById(object.generalInfo.company).subscribe((response: any)=> {
                this.invoice.from.title = response.company.name;
                this.invoice.from.address = response.company.address + ', ' + response.company.city.zip_code + ' ' + response.company.city.name;
                this.invoice.from.PIB = response.company.account.pib;
                this.invoice.from.MB = response.company.firm_id;
                this.invoice.from.BA = response.company.account.account_number + ' ' + response.company.account.bank.name;
                this.invoice.from.phone = response.company.phone;
                this.invoice.from.email = response.company.email;
            });

            let serialNumber = 1;
            object.items.forEach((r: any)=> {
                r.serialNumber = serialNumber;
                r.valueNoPDV = r.amount*r.priceNoPDV;
                r.baseForPDV = r.valueNoPDV;
                r.ratePDV = 20;
                r.amountPDV = (r.baseForPDV*0.2).toFixed(2);
                r.valueWithPDV = r.baseForPDV + +r.amountPDV;
                this.invoice.totalNoPDV += r.baseForPDV;
                this.invoice.services.push(r);

                serialNumber++;
            });
            this.invoice.totalPDV = (this.invoice.totalNoPDV*0.2).toFixed(2);
            this.invoice.totalWithPDV = this.invoice.totalNoPDV + +this.invoice.totalPDV;

            this.invoiceService.getLastSerialNumber(object).subscribe((response: any)=> {
                this.serialNumber = response;
            });
        });


    }    

    ngOnDestroy(): void
    {

    }

    onPrint(){
    	window.print();

    }
}

