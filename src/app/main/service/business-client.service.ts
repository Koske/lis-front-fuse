import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class BusinessClientService {

  constructor(private httpService: HttpService) { }

  newBusinessClient(client: any){
  	return this.httpService.post("newBusinessClient", client);
  }

  getBusinessClients(){
  	return this.httpService.get("getBusinessClients");
  }

  getBusinessClientById(id: any){
  	return this.httpService.post("getBusinessClientById", { id: id });
  }

  editBusinessClient(bsnsClient: any){
    this.httpService.post("editBusinessClient", bsnsClient).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
  }
  getCountries(){
    return this.httpService.get("getCountries");
  }
}
