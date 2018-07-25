import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantTypeService {

  constructor(private httpService: HttpService) { }

  newParticipantType(participantType: any){
  	this.httpService.post("newParticipantType", participantType).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
  }

  getParticipantTypes(){
  	return this.httpService.get("getAllParticipantTypes");
  }

  removeParticipantType(id: any){
    this.httpService.post("removeParticipantType", { id: id }).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
  }
}
