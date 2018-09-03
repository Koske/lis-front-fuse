import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpService: HttpService) { }

  getCountries(){
  	return this.httpService.get("getCountries");
  }
}
