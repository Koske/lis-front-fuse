import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectExpenseService {

  constructor(private httpService: HttpService) { }

  
    newProjectExpense(expense: any){
      this.httpService.post("newProjectExpense", expense).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }

    getAllProjectExpenses(){
    	return this.httpService.get("getAllProjectExpenses");
    }

    removeProjectExpense(id: any){
      this.httpService.post("removeProjectExpense", { id: id}).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }

    editProjectExpense(expense: any){
      this.httpService.post("editProjectExpense", expense).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }

    getProjectExpenseById(id: any){
      return this.httpService.post("getProjectExpenseById", { id: id});
    }
}
