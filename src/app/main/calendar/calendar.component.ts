import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { ActivatedRoute, Params } from '@angular/router';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';
import { DaysOffService } from '../service/days-off.service';
import { HolidayService } from '../service/holiday.service';
import { CalendarEventModel } from './event.model';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { DatePipe } from '@angular/common';


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
    events: CalendarEvent[] = [];
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
    customEvents: any[] = [];
    tempDate: any;

    constructor(
        private _matDialog: MatDialog,
        private daysOffService: DaysOffService,
        private holidayService: HolidayService,
        private route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe
    )
    {
        // Set the defaults
        this.view = 'month';
        this.activeDayIsOpen = false;
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
        this.getHolidays();

    }

    getHolidays(){
        this.holidayService.getHolidays().subscribe((response: any)=> {
                response.holidays.forEach((r)=> {
                    this.customEvents.push(this.createEvent(r));
                });
                console.log(this.customEvents);
                this.setEvents();
        });
    }

    /**
     * Set events
     */
    setEvents(): void
    {
        this.customEvents.forEach((r)=> {
            this.events.push(new CalendarEventModel(r.value));
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
                if(_today){
                    _today.isToday = false;
                    for(let i of this.dates){
                        if(i.getTime() == _today.date.getTime()){
                            _today.isToday = true;
                            break;
                        }
                    }
                }


            });
        });
    }

        /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEvent(event: any): FormGroup
    {

        return new FormGroup({
            title : new FormControl(event.name),
            start : new FormControl(event.start_date),
            end   : new FormControl(event.end_date),
            allDay: new FormControl(true),
            recursOn: new FormControl('year'),
            color : this._formBuilder.group({
                primary  : new FormControl('#1e90ff'),
                secondary: new FormControl('#D1E8FF')
            }),
            meta  :
                this._formBuilder.group({
                    location: new FormControl(''),
                    notes   : new FormControl('')
                })
        });
    }

}


