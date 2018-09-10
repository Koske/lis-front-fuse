import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  constructor(private httpService: HttpService) { }

  getInvoiceItem(id: any){
  	return this.httpService.post("getInvoiceItem", { id: id});
  }
}
