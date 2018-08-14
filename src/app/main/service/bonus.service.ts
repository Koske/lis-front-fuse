import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  constructor(private httpService: HttpService) { }

  newBonus(bonus: any){
  	return this.httpService.post("newBonus", bonus);
  }

  getBonuses(){
  	return this.httpService.get("getBonuses");
  }

  removeBonus(id: any){
  	this.httpService.post("removeBonus", { id: id }).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }

  getBonusById(id: any){
  	return this.httpService.post("getBonusById", { id: id });
  }

  editBonus(bonus: any){
  	return this.httpService.post("editBonus", bonus).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }

  filterBonuses(startDate: any, endDate: any, dates: any){
    return this.httpService.post("filterBonuses", { startDate: startDate, endDate: endDate, dates: dates});
  }
}
