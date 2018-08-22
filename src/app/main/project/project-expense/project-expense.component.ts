import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ProjectExpenseService } from '../../service/project-expense.service';

@Component({
  selector: 'app-project-expense',
  templateUrl: './project-expense.component.html',
  styleUrls: ['./project-expense.component.scss']
})
export class ProjectExpenseComponent implements OnInit {

    displayedColumns = [ 'description', 'amount', 'project' ];
    expenses: any[];
    expenseId: number = -1;

  	constructor(private projectExpenseService: ProjectExpenseService,
  				private router: Router) { }

  	ngOnInit() {
  		this.getExpenses();
  	}

  	getExpenses(){
  		this.projectExpenseService.getAllProjectExpenses().subscribe((response: any)=> {
  			this.expenses = response.expenses;
  		});
  	}

    stashInfo(expnsId){
      if(this.expenseId == expnsId){
        this.expenseId = -1;
        let table = document.getElementById(expnsId);
        table.classList.toggle("active");
      }else if(this.expenseId!= -1){
        let id = this.expenseId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.expenseId = expnsId;
        let id2 = this.expenseId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.expenseId = expnsId;

        let table = document.getElementById(expnsId);
        table.classList.toggle("active");
      }

    }

    onRemove(){
    	if(this.expenseId!= -1 && confirm('Are you sure you want to delete this Expense?')){
	    	this.projectExpenseService.removeProjectExpense(this.expenseId);
	    	this.expenseId = -1;
	    	this.getExpenses();
	    }
    }

    onEdit(){
    	if(this.expenseId!= -1)
    		this.router.navigate(['edit-expense', this.expenseId]);
    }
}
