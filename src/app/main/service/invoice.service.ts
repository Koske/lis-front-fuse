import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpService: HttpService) { }


  	newInvoice(invoice: any){
	  	this.httpService.post("newInvoice", {invoice: invoice}).subscribe(
	            (response) => console.log(response),
	            (error) => console.log(error)
	        );
  	}

  	getLastSerialNumber(invoice: any){
  	  	return this.httpService.post("getLastSerialNumber", {invoice: invoice});
  	}
}
