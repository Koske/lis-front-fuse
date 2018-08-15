import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { PresenceService } from '../service/presence.service';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-edit-presence',
    templateUrl: './edit-presence.component.html',
    styleUrls: ['./edit-presence.component.scss']
})
export class EditPresenceComponent implements OnInit, OnDestroy {
    form: FormGroup;
	  formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    form1: FormGroup;
    currentUser: any;
    presences: any;
    presenceId: string = 'none';
    time: any;
    realId: number = -1;
    type: string = 'none';
    displayedColumns = ['start', 'end'];
    clicked: boolean = false;
    dates = [
      {value: 'unixStartDate', viewValue: 'Start Date'},
      {value: 'unixEndDate', viewValue: 'End Date'}
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
    constructor(private userService: UserService,
      			    private presenceService: PresenceService,
      			    private _formBuilder: FormBuilder,
                private dialog: MatDialog,
                private datePipe: DatePipe)
    {
  			this.formErrors = {
  	            time 			   : {}
    			};
  			this._unsubscribeAll = new Subject();

	  }
    ngOnInit(): void
    {
    	  this.userService.getCurrentUser().subscribe((response: any) => {
    		  this.currentUser = response.user;
  	  	  this.getPresences();
    	  });

        this.form = this._formBuilder.group({

            time : ['', Validators.required]
        });

        this.form1 = this._formBuilder.group({
            startDate : [''],
            endDate  : [''],
            dates : ['']
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });
    }

    stashInfo(prId, type: string, realId){
        if(this.presenceId == prId){
       	  this.realId = -1;
          this.presenceId = 'none';
          this.type = 'none';
          let table = document.getElementById(prId);
          table.classList.toggle("active");
        }  
        else if(this.presenceId!='none'){
          let id = this.presenceId.toString();
          let table = document.getElementById(id);
          table.classList.toggle("active");
          this.realId=realId;
          this.type = type;
          this.presenceId = prId;
          let id2 = this.presenceId.toString();
          table = document.getElementById(id2);
          table.classList.toggle("active");
        }
        else{
       	  this.realId=realId;
       	  this.type = type;
          this.presenceId = prId;
          let table = document.getElementById(prId);

          table.classList.toggle("active");
        }
        this.openDialog();

    }

    onSubmit(){
       	this.time = this.form.value.time;
       	this.presenceService.editPresence(this.time, this.realId, this.type);
      	this.presenceId = 'none';
        this.type = 'none';
        this.realId = -1;
       	this.getPresences();
    }

    getPresences(){
      	this.presenceService.getPresenceByUser(this.currentUser).subscribe((response: any) => {

      	this.presences = response.presences

      	this.presences.forEach((res) => {
      		res.start = res.start.substring(0, 10) + ' ' + res.start.substring(11, 16);
      		res.end = res.end.substring(0, 10) + ' ' + res.end.substring(11, 16);
       
      		});
      	});
    }
    ngOnDestroy(): void
	  {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onFormValuesChanged(): void
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

    toggleClick(){
      this.clicked = !this.clicked;
    }

    onReset(){
      this.form1.reset();
      this.getPresences();

      setTimeout(() => {
        this.form1.reset();
        this.getPresences();
      }, 500);
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
          data => {

              let table = document.getElementById(this.presenceId);
              table.classList.toggle("active");
              if(data){
                this.presenceService.editPresence(data.time, this.realId, this.type);
              }
              this.realId = -1;
              this.presenceId = 'none';
              this.type = 'none';
              this.getPresences();

          }
        );
    }

    onFinish(){
      if(this.form1.value.dates!= '' && (this.form1.value.startDate!= '' || this.form1.value.endDate!= '')){
        
        if(this.form1.value.startDate){
          this.presenceForm.startDate = this.datePipe.transform(new Date(this.form1.value.startDate), 'shortDate');
        }else{
          this.presenceForm.startDate = '';
        }
        
        if(this.form1.value.endDate){
          this.presenceForm.endDate = this.datePipe.transform(new Date(this.form1.value.endDate), 'shortDate');
        }else {
          this.presenceForm.endDate = '';
        }

        this.presenceForm.dates = this.form1.value.dates;
        this.presenceService.filterPresences(this.presenceForm.startDate, this.presenceForm.endDate, this.presenceForm.dates, this.currentUser.id).subscribe((response: any)=> {
          
          this.presences = response.presences

          this.presences.forEach((res) => {
            res.start = res.start.substring(0, 10) + ' ' + res.start.substring(11, 16);
            res.end = res.end.substring(0, 10) + ' ' + res.end.substring(11, 16);
         
            });

        });
      }
    }
}
