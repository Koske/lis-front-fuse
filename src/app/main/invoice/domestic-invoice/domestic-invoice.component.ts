import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pdv-domestic-invoice',
  templateUrl: './domestic-invoice.component.html',
  styleUrls: ['./domestic-invoice.component.scss']
})
export class DomesticInvoiceComponent implements OnInit {

    currentYear = this.datePipe.transform(new Date(), 'y');
    currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
	invoice = {
		from: {
			title: 'NEBOJŠA BOBIĆ PR RAČUNARSKO PROGRAMIRANJE MD40 VETERNIK',
			address: 'ABADŽIJSKA 9 VETERNIK',
			pib: '110193667',
			tel: '063/348-421',
			ba: '160-487463-59'
		},
		services: [{
			serialNumber: '1',
			title: 'Usluge programiranja',
			unit: 'cas',
			quantity: 10000,
			unitPrice: 1800,
			value: 1800000
		}],
		client: {
			title: 'Agencija za obrazovanje NTC EDU',
			zipAndCity: '21000 Novi Sad',
			address: 'Josifa Runjanica 3',
			pib: '108690801'
		},
	};


  	constructor(private _fuseConfigService: FuseConfigService,
                private datePipe: DatePipe) { 

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

  ngOnInit() {
  }

}

