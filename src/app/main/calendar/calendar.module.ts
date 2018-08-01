import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { CalendarComponent } from './calendar.component';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component'; 



@NgModule({
    declarations   : [
        CalendarComponent,
        CalendarEventFormDialogComponent
    ],
    imports        : [

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,

        AngularCalendarModule.forRoot(),
        ColorPickerModule,

        FuseSharedModule,
        FuseConfirmDialogModule
    ],
    providers      : [
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule
{
}
