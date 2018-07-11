import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpService: HttpService) { }

   getInitialInfo(id: any,year: any, month: any ){


  	return this.httpService.post("getInitialInfo", {id: id, date: year, month: month});
  }

  getInfoForMonth(id: any,year: any, month: any ){
  	return this.httpService.post("getInfoForMonth", {id: id, date: year, month: month});
  }
}
