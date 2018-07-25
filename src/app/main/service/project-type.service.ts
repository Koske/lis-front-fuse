import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  constructor(private httpService: HttpService) { }

  newProjectType(projectType: any){
  	this.httpService.post("newProjectType", projectType).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }

  getProjectTypes(){
  	return this.httpService.get("getProjectTypes");
  }

  removeProjectType(id: any){
    this.httpService.post("removeProjectType", { id: id }).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }
}
