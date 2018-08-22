import { Component, OnInit } from '@angular/core';
import { BankService } from '../service/bank.service'
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
    
  	displayedColumns = ['name', 'swift'];
  	bankId: number = -1;
  	data: any;
  	constructor(private bankService: BankService) { }

  	ngOnInit() {
  		this.getBanks();
  	}

  	getBanks(){
  		this.bankService.getAllBanks().subscribe((response: any)=> {
  			this.data = response.banks;
  		});
  	}

    stashInfo(bnkId){
      	if(this.bankId == bnkId){
	        this.bankId = -1;
	        let table = document.getElementById(bnkId);
	        table.classList.toggle("active");
      	}else if(this.bankId!= -1){
	        let id = this.bankId.toString();
	        let table = document.getElementById(id);
	        table.classList.toggle("active");

	        this.bankId = bnkId;
	        let id2 = this.bankId.toString();
	        table = document.getElementById(id2);
	        table.classList.toggle("active");
      	}else{
        	this.bankId = bnkId;

	        let table = document.getElementById(bnkId);
	        table.classList.toggle("active");
      	}
    }

    onRemove(){
      if(this.bankId){
        if(confirm('Are you sure you want to delete this Bank?'))
          this.bankService.removeBank(this.bankId);
          this.bankId= -1;
          this.getBanks();
      }
    }

}
