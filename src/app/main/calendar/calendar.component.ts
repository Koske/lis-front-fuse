import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { ActivatedRoute, Params } from '@angular/router';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';
import { DaysOffService } from '../service/days-off.service';
import { CalendarEventModel } from './event.model';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';

@Component({
    selector     : 'calendar',
    templateUrl  : './calendar.component.html',
    styleUrls    : ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CalendarComponent implements OnInit
{
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    selectedDay1: any;
    view: string;
    viewDate: Date;
    today: any;
    days: any;
    userId: any;
    starts: any[] = [];
    ends: any[] = [];
    check: any[] = [];
    dates: any[] = [];
    constructor(
        private _matDialog: MatDialog,
        private daysOffService: DaysOffService,
        private route: ActivatedRoute
    )
    {
        // Set the defaults
        this.view = 'month';
        this.activeDayIsOpen = true;
        this.viewDate = new Date();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.route.params.subscribe((params: Params)=> {
            this.userId = params['id'];
            this.daysOffService.getDaysOffUser(this.userId).subscribe((response: any)=> {
                this.days = response.dayOff;
            });
        });

    }

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({header, body}): void
    {
        this.route.params.subscribe((params: Params)=> {
            this.userId = params['id'];
            this.daysOffService.getDaysOffUser(this.userId).subscribe((response: any)=> {
                this.days = response.dayOff;
                for(let i of this.days){
                    let b = startOfDay(new Date(i.start.substring(0, 10)));
                    let v = startOfDay(new Date(i.end.substring(0, 10)));
                    this.starts.push(b);
                    this.ends.push(v); 
                }
                let today = startOfDay(new Date());

                for(let i= 0; i< this.starts.length; i++){
                    while(this.starts[i] <= this.ends[i]){
                        this.dates.push(startOfDay(new Date(this.starts[i])));
                        this.starts[i].setDate(this.starts[i].getDate()+1);
                    }
                }
                    const _today = body.find((_day) => {
                        return _day.date.getTime() === today.getTime();
                    });
                for(let i = 0;i< this.dates.length; i++){
                    const highlight = body.find((_day) => {
                        return _day.date.getTime() === this.dates[i].getTime();
                    });

                    if(highlight){
                        highlight.isToday = true;
                    }


                }
                if(_today)
                    _today.isToday = false;

            });
        });
    }


    /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
    editEvent(action: string, event: CalendarEvent): void
    {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                event : event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
                        this.refresh.next(true);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':


                        break;
                }
            });
    }

    /**
     * Add Event
     */
    addEvent(): void
    {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                action: 'new',
                date  : this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                this.events.push(newEvent);
                this.refresh.next(true);
            });
    }


}


