import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  private objectSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  currentObject = this.objectSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  addObject(object: any){
  	this.objectSource.next(object);
  }
}
