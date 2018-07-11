import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { PresenceService } from '../service/presence.service';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog.component'
@Component({
    selector: 'app-edit-presence',
    templateUrl: './edit-presence.component.html',
    styleUrls: ['./edit-presence.component.scss']
})
export class EditPresenceComponent implements OnInit, OnDestroy {
    form: FormGroup;
	  formErrors: any;	
    private _unsubscribeAll: Subject<any>;
    currentUser: any;
    presences: any;
    presenceId: string = 'none';
    time: any;
    realId: number = -1;
    type: string = 'none';
    displayedColumns = ['start', 'end'];
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(private userService: UserService,
      			    private presenceService: PresenceService,
      			    private _formBuilder: FormBuilder,
                private dialog: MatDialog)
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

        console.log(this.presenceId, type, realId);
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
      	console.log(response.presences);

      	this.presences = response.presences

      	this.presences.forEach((res) => {
      		res.start = res.start.substring(0, 10) + ' ' + res.start.substring(11, 16);
      		res.end = res.end.substring(0, 10) + ' ' + res.end.substring(11, 16);
       
      		})
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

    openDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
          data => {
            // if(data)
            // console.log("Dialog output:", data.time)

              let table = document.getElementById(this.presenceId);
              table.classList.toggle("active");
              if(data){
                this.presenceService.editPresence(data.time, this.realId, this.type);
              }
              this.realId = -1;
              this.presenceId = 'none';
              this.type = 'none';
              this.getPresences();

              console.log(this.presenceId, this.type, this.realId);
          }
        );}
}
