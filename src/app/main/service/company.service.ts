import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpService: HttpService) { }

 	  newCompany(company: any){
	  	this.httpService.post("newCompany", company).subscribe(
	            (response) => console.log(response),
	            (error) => console.log(error)
	        );
  	}

  	getCompanies(){
  		return this.httpService.get("getCompanies");
  	}

    getCompanyById(companyId: any){
      return this.httpService.post("getCompanyById", { companyId: companyId });
    }

    editCompany(company: any){
      this.httpService.post("editCompany", company).subscribe(
              (response) => console.log(response),
              (error) => console.log(error)
          );
    }

    removeCompany(id: any){
      this.httpService.post("removeCompany", { id: id}).subscribe(
              (response) => console.log(response),
              (error) => console.log(error)
          );
    }

}
