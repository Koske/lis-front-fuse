import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AuthConfig } from './auth-config';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  access_token: any;

  constructor(private httpService: HttpService,
              private router: Router) {}

    login(user: any) {
        console.log(user.password);
        const params:any = {
            username: user.username,
            password: user.password,
            client_id: AuthConfig.CLIENT_ID,
            client_secret: AuthConfig.CLIENT_SECRET,
            grant_type: 'password'
        };


        this.httpService.get('oauth/v2/token', params, false).subscribe(res => {
            this.access_token = res;
            localStorage.setItem('access_token', this.access_token.access_token);
            localStorage.setItem('email', user.username);
            this.router.navigate(['']);
        });
    }

    logout() {
        //this.access_token = null;
        localStorage.clear();
        this.router.navigate(['login']);
    }
}
