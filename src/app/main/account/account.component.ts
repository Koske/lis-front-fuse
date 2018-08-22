import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service'
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  displayedColumns = ['type', 'accountNumber', 'bank', 'swift'];
  data: any;
  accountId: number = -1;
  constructor(
                private accountService: AccountService,
                private router: Router) { }

  	ngOnInit() {
  		this.getAccounts();
  	}

  	getAccounts(){
	  	this.accountService.getAccounts().subscribe((response: any)=> {
	  		this.data = response.accounts;
	  	});
  	}

    stashInfo(accId){
      	if(this.accountId == accId){
	        this.accountId = -1;
	        let table = document.getElementById(accId);
	        table.classList.toggle("active");
      	}else if(this.accountId!= -1){
	        let id = this.accountId.toString();
	        let table = document.getElementById(id);
	        table.classList.toggle("active");

	        this.accountId = accId;
	        let id2 = this.accountId.toString();
	        table = document.getElementById(id2);
	        table.classList.toggle("active");
      	}else{
        	this.accountId = accId;

	        let table = document.getElementById(accId);
	        table.classList.toggle("active");
      	}
    }

}
