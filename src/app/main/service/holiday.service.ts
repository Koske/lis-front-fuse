import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private httpService: HttpService) { }

  	newHoliday(holiday: any){
  		this.httpService.post("newHoliday", holiday).subscribe(
	            (response) => console.log(response),
	            (error) => console.log(error)
        	);
  	}

  	getHolidays(){
  		return this.httpService.get("getHolidays");
  	}

  	removeHoliday(id: any){
  		this.httpService.post("removeHoliday", { id: id }).subscribe(
	            (response) => console.log(response),
	            (error) => console.log(error)
        	);
  	}
}
