import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpService: HttpService) { }

  getCurrencies(){
  	return this.httpService.get("getCurrency");
  }
}
