import { Component, OnInit } from '@angular/core';
import { InvoiceItemService } from '../../service/invoice-item.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit {

	itemId: any;
	items: any[] = [];
  	displayedColumns = ['name', 'unit', 'unit_price', 'amount'];

  	constructor(private invoiceItemService: InvoiceItemService,
  				private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.itemId = this.route.snapshot.params['id'];

  		this.invoiceItemService.getInvoiceItem(this.itemId).subscribe((response: any)=> {
  			this.items = response;
  		});
  	}

}
