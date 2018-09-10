import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CompanyService } from '../../service/company.service';
import { BusinessClientService } from '../../service/business-client.service';
import { BankService } from '../../service/bank.service';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-pdv-domestic-invoice',
  templateUrl: './domestic-invoice.component.html',
  styleUrls: ['./domestic-invoice.component.scss']
})
export class DomesticInvoiceComponent implements OnInit {

    currentYear = this.datePipe.transform(new Date(), 'y');
    currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    serialNumber: number = 0;
	  invoice = {

  		from: {
  			title: '',
  			address: '',
  			pib: '',
  			tel: '',
  			ba: ''
  		},

		  services: [],

  		client: {
  			title: '',
  			zipAndCity: '',
  			address: '',
  			pib: ''
  		},
      total: 0,
      para: 0,
      slovima: ''
	  };
    eurToDinar = '';


  	constructor(private _fuseConfigService: FuseConfigService,
                private datePipe: DatePipe,
                private dataService: DataService,
                private businessClientService: BusinessClientService,
                private bankService: BankService,
                private invoiceService: InvoiceService,
                private companyService: CompanyService,) { 
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
        this.bankService.getExchangeRate('eur').subscribe((response: any)=> {
          this.eurToDinar = response;
        });

        this.dataService.currentObject.subscribe((object: any)=> {
          console.log(object);
          this.businessClientService.getBusinessClientById(object.generalInfo.businessClient).subscribe((response: any)=> {
              this.invoice.client.title = response.businessClient.name;
              this.invoice.client.zipAndCity = response.businessClient.city.zip_code + ' ' + response.businessClient.city.name;
              this.invoice.client.address = response.businessClient.address;
              this.invoice.client.pib = response.businessClient.account.pib;
          });

          this.companyService.getCompanyById(object.generalInfo.company).subscribe((response: any)=> {
              this.invoice.from.title = response.company.name;
              this.invoice.from.tel = response.company.phone;
              this.invoice.from.pib = response.company.account.pib;
              this.invoice.from.ba = response.company.account.account_number;
              this.invoice.from.address = response.company.address;
          });

          this.invoiceService.getLastSerialNumber(object).subscribe((response: any)=> {
              this.serialNumber = response;
          });


          let serialNumber = 1;
          object.items.forEach((r: any)=> {
            r.serialNumber = serialNumber;
            r.value = +(r.priceNoPDV*r.amount).toFixed(2);
            this.invoice.services.push(r);
            this.invoice.total += r.value;

            serialNumber++;
          });
          this.invoice.total = +this.invoice.total.toFixed(2);
          this.invoice.para = (+(this.invoice.total %1).toFixed(2))*100;
          this.invoice.slovima = object.pinfo.slovima;
        });


    } 

    onPrint(){
      window.print();
    }
}

