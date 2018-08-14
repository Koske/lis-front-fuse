import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../http/http.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { BonusService } from '../service/bonus.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent implements OnInit {

    formErrors: any;  
    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
	  bonuses: any;
	  bonusId: number= -1;
    clicked: boolean = false;
    bonus: any;
    totalBonuses: number = -1;
    displayedColumns = ['fullName', 'value', 'date', 'date_created'];
    bonusForm = {
      startDate: '',
      endDate: '',
      dates: ''
    }
    dates = [
      {value: 'unixDate', viewValue: 'Date Valid'},
      {value: 'unixDateCreated', viewValue: 'Date Created'}
    ];
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  	constructor(private bonusService: BonusService,
                private router: Router,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) {



    this._unsubscribeAll = new Subject();
     }

 	ngOnInit() {

         // Reactive Form
    this.form = this._formBuilder.group({

        startDate : [''],
        endDate  : [''],
        dates : ['']
    });

	  this.getBonuses();
	}

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  	getBonuses(){
  		this.bonusService.getBonuses().subscribe((response: any)=> {
  			this.bonuses= response.bonuses;
        this.totalBonuses = 0;
  			this.bonuses.forEach((r)=> {
  				r.date = r.date.substring(0, 10);
          this.totalBonuses += r.value;
  				r.date_created = r.date_created.substring(0, 10);
  				r.date_updated = r.date_updated.substring(0, 10);
  			});
  		});
  	}

    stashInfo(bnsId){
      if(this.bonusId == bnsId){
        this.bonusId = -1;
        let table = document.getElementById(bnsId);
        table.classList.toggle("active");
      }else if(this.bonusId!= -1){
        let id = this.bonusId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.bonusId = bnsId;
        let id2 = this.bonusId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.bonusId = bnsId;

        let table = document.getElementById(bnsId);
        table.classList.toggle("active");
      }

    }

    onRemove(){
    	if(this.bonusId){
    		if(confirm('Are you sure you want to delete this bonus?'))
    			this.bonusService.removeBonus(this.bonusId);
    			this.bonusId= -1;
    			this.getBonuses();
    	}

    }

    toggleClick(){
      this.clicked = !this.clicked;
    }

    onEdit(){
      this.router.navigate(['edit-bonus', this.bonusId]);

    }

    onFinish(){
      if(this.form.value.dates!= '' && (this.form.value.startDate!= '' || this.form.value.endDate!= '')){
        
        if(this.form.value.startDate){
          this.bonusForm.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
        }else{
          this.bonusForm.startDate = '';
        }
        
        if(this.form.value.endDate){
          this.bonusForm.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');
        }else {
          this.bonusForm.endDate = '';
        }
        
        this.bonusForm.dates = this.form.value.dates;
        this.bonusService.filterBonuses(this.bonusForm.startDate, this.bonusForm.endDate, this.bonusForm.dates).subscribe((response: any)=> {
          this.totalBonuses = 0;
          response.bonuses.forEach((r)=> {
            r.date = r.date.substring(0, 10);
            this.totalBonuses += r.value;
            r.date_created = r.date_created.substring(0, 10);
            r.date_updated = r.date_updated.substring(0, 10);
          });

          this.bonuses = response.bonuses;

        });
      }
    }


    onReset(){
      this.form.reset();
      this.getBonuses();

      setTimeout(() => {
        this.form.reset();
        this.getBonuses();
      }, 500);
    }
}
