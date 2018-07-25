import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpService: HttpService) { }

  newPosition(position: any){
  	this.httpService.post("newPosition", position).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }

  getPositions(){
  	return this.httpService.get("getPositions");
  }

  removePosition(id: any){
  	this.httpService.post("removePosition", { id: id}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }
}
