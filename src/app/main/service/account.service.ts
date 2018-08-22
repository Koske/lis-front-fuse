import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  	constructor(private httpService: HttpService) { }

  	newAccount(account: any){
	  	this.httpService.post("newAccount", account).subscribe(
	            (response) => console.log(response),
	            (error) => console.log(error)
	        );
  	}

  	getAccounts(){
  		return this.httpService.get("getAccounts");
  	}

}
