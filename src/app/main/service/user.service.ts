import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AuthConfig } from '../auth/auth-config';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private httpService: HttpService) { }

    getUsers(users: any, page: any, perPage: any) {
        console.log(localStorage.getItem(users));

        const params:any = {
            page: page,
            perPage: perPage
        }
        
        return this.httpService.get('users/get', params, true);
      }

    getCurrentUser(){
    	return this.httpService.get('user/current');
    }

    getAllUsers(page: any, perPage: any){
        const params:any = {
            page: page,
            perPage: perPage
        }
        
        return this.httpService.get('users/get', params, true);
    }
    getUserData() {
        return this.httpService.getUserData('user/data', true);
    }

    getUserById(id: any) {


        return this.httpService.post('user/get', {user_id: id}, true);
    }

    deleteUser(id: any) {


	    this.httpService.post('user/delete', {id: id}, true).subscribe(res => {
	        console.log(res);
	    });
  	}

    getSearch(users: any, page: any, perPage: any, searchTerm: any) {
        console.log(localStorage.getItem(users));

        const params:any = {
            page: page,
            perPage: perPage,
            searchTerm: searchTerm
        }

        return this.httpService.get('user/search', params, true);
      }

    register(user: any) {


    this.httpService.post('user/create', user, true).subscribe(res => {
        console.log(res);
    });
  }
    edit(user: any) {

        this.httpService.post('user/update', user, true).subscribe(res => {
            console.log(res);
        });
    }

    getAllUsersSimple(){
        return this.httpService.get("getAllUsers");
    }
}
