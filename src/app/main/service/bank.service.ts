import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private httpService: HttpService) { }

 	newBank(bank: any){
	  	this.httpService.post("newBank", bank).subscribe(
	          (response) => console.log(response),
	          (error) => console.log(error)
	        );
  	}

	getAllBanks(){
		return this.httpService.get("getAllBanks");
	}

  removeBank(id: any){
    this.httpService.post("removeBank", { id: id}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );
  }
}
