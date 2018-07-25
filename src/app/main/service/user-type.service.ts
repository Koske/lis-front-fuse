import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private httpService: HttpService) { }

  	newUserType(userType: any){
  		this.httpService.post("newUserType", userType).subscribe(
          	(response) => console.log(response),
          	(error) => console.log(error)
        );
  	}

  	getUserTypes(){
  		return this.httpService.get("getUserTypes");
  	}

  	removeUserType(id: any){
  		this.httpService.post("removeUserTypes", { id: id }).subscribe(
          	(response) => console.log(response),
          	(error) => console.log(error)
        );
  	}
}
