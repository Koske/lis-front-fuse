import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class DaysOffService {

  	constructor(private httpService: HttpService) { }

  	newDaysOff(daysOff: any){
      console.log(daysOff);
  		this.httpService.post("newDaysOff", daysOff).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  	}

  	getDaysOff(){
  		return this.httpService.get("getDaysOff");
  	}

    removeDaysOff(id: any){
      this.httpService.post("removeDaysOff", { id: id }).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    editDaysOff(daysOff: any){
      this.httpService.post("editDaysOff", {daysOff: daysOff}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    getDayOffById(id: any){
      return this.httpService.post("getDayOffById", { id: id });
    }
}
