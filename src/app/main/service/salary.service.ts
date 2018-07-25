import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { HttpParams } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class SalaryService {

  	constructor(private httpService: HttpService) { }

  	newSalary(salary: any){
  		return this.httpService.post("newSalary", salary);
  	}

  	getSalaries(){
  		return this.httpService.get("getSalaries");
  	}

  	removeSalary(id: any){
  		this.httpService.post("removeSalary", { id: id }).subscribe(
          	(response) => console.log(response),
          	(error) => console.log(error)
        );
  	}

    getSalaryById(id: any){
      return this.httpService.post("getSalaryById", { id: id });
    }

    editSalary(salary: any){
      this.httpService.post("editSalary", salary).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }
}
