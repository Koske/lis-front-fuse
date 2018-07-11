import { Component, OnInit, Injectable } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

 	form: FormGroup;
    description:string;
    formErrors: any;	
    private _unsubscribeAll: Subject<any>;


    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogComponent>) {

    	this.formErrors = {
            time 			   : {}
        };

		this._unsubscribeAll = new Subject();

    }

    ngOnInit() {
        this.form = this.fb.group({
            time: [, [Validators.required]],
            
        });

        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
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

    	ngOnDestroy(): void
	{
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
