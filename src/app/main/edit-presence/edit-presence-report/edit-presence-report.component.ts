import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../../service/presence.service';
import { ActivatedRoute} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-edit-presence-report',
    templateUrl: './edit-presence-report.component.html',
    styleUrls: ['./edit-presence-report.component.scss']
})
export class EditPresenceReportComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
    userId: any;
    presences: any;
    fullUserName: string = '';
    displayedColumns = ['originalStart','originalEnd', 'start', 'end'];
    clicked: boolean = false;
    dates = [
      {value: 'unixOriginalStartDate', viewValue: 'Original start'},
      {value: 'unixOriginalEndDate', viewValue: 'Original end'},
      {value: 'unixStartDate', viewValue: 'New start'},
      {value: 'unixEndDate', viewValue: 'New end'}
    ];
    presenceForm = {
      startDate: '',
      endDate: '',
      dates: ''
    }

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(private route: ActivatedRoute,
    			      private presenceService: PresenceService,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) { 
            
            this._unsubscribeAll = new Subject();

                 }

  ngOnInit() {
      
      this.form = this._formBuilder.group({
          startDate : [''],
          endDate  : [''],
          dates : ['']
      });


    	this.userId = this.route.snapshot.params['id'];

      this.getPresences();

    }

    getPresences(){
       this.presenceService.getEditedPresencesByUser(this.userId).subscribe((response: any) => {
       
       this.presences = response.presences;
       this.fullUserName = response.user.first_name + ' ' + response.user.last_name;
         for(let p of this.presences){
           if(p.start){
             p.start = p.start.substring(0, 10) + ' ' + p.start.substring(11, 16);
           }
           if(p.end){
          p.end = p.end.substring(0, 10) + ' ' + p.end.substring(11, 16);
        }

        p.original_start = p.original_start.substring(0, 10) + ' ' + p.original_start.substring(11, 16);
        p.original_end = p.original_end.substring(0, 10) + ' ' + p.original_end.substring(11, 16);
         }
       
       });
    }

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

    toggleClick(){
      this.clicked = !this.clicked;
    }

    onReset(){
      this.form.reset();
      this.getPresences();

      setTimeout(() => {
        this.form.reset();
        this.getPresences();
      }, 500);
    }

  onFinish(){
    if(this.form.value.dates!= '' && (this.form.value.startDate!= '' || this.form.value.endDate!= '')){
      
      if(this.form.value.startDate){
        this.presenceForm.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
      }else{
        this.presenceForm.startDate = '';
      }
      
      if(this.form.value.endDate){
        this.presenceForm.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');
      }else {
        this.presenceForm.endDate = '';
      }

      this.presenceForm.dates = this.form.value.dates;
      this.presenceService.filterEditedPresences(this.presenceForm.startDate, this.presenceForm.endDate, this.presenceForm.dates, this.userId).subscribe((response: any)=> {
         
       this.presences = response.presences;
         for(let p of this.presences){
           if(p.start){
             p.start = p.start.substring(0, 10) + ' ' + p.start.substring(11, 16);
           }
           if(p.end){
          p.end = p.end.substring(0, 10) + ' ' + p.end.substring(11, 16);
        }

        p.original_start = p.original_start.substring(0, 10) + ' ' + p.original_start.substring(11, 16);
        p.original_end = p.original_end.substring(0, 10) + ' ' + p.original_end.substring(11, 16);
         }

      });
    }
  }
}
