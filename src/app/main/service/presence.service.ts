import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private httpService: HttpService) { }

    checkIn() {
        return this.httpService.post('presence/checkin', {email: localStorage.getItem('email')}, true);
    }

    checkOut(business_checked: boolean) {
    
        return this.httpService.post('presence/checkout', {email: localStorage.getItem('email'), "business": business_checked}, true);
    }

    userIsCheckedIn() {
    	return this.httpService.post('presence/userIsCheckedIn', {email: localStorage.getItem('email')}, true);
    }
    getPresenceByUser(user: any){
        return this.httpService.post('getPresenceByUser', {user: user});
    }

    editPresence( time: any, presence: any, type: any){
        this.httpService.post('editPresence', {time: time,presence: presence, type: type}).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    getEditedPresencesByUser(userId: any){
        return this.httpService.post('getEditedPresences', { userId: userId });
    }

    filterEditedPresences(startDate: any, endDate: any, dates: any, id: any){
        return this.httpService.post("filterEditedPresences", {startDate: startDate, endDate: endDate, dates: dates, id: id});
    }

    filterPresences(startDate: any, endDate: any, dates: any, id: any){
        return this.httpService.post("filterPresences", {startDate: startDate, endDate: endDate, dates: dates, id: id});
    }


}
