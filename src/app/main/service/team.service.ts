import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpService: HttpService) { }

  	newTeam(name: any, description: any){
	  	this.httpService.post("newTeam", {name: name, description: description}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  	}

  	getTeams(){
  		return this.httpService.get("getTeams");
  	}

    removeTeam(id: any){
      this.httpService.post("removeTeam", { id: id}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );;
    }

    getTeamById(id: any){
      return this.httpService.post("getTeamById", { id: id });
    }

    editTeam(name: any, description: any, id: any){
      this.httpService.post("editTeam", { id:id, name: name, description: description}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    getUsersForTeam(id: any){
      return this.httpService.post("getUsersForTeam", { id: id });
    }

    removeFromTeam(id: any){
      this.httpService.post("removeFromTeam", { id: id}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );;
    }
}
