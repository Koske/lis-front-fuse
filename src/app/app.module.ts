import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ColorPickerModule } from 'ngx-color-picker';

import { DatePipe } from '@angular/common';

import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule, FuseWidgetModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { HomeComponent } from './main/home/home.component';
import { HttpService } from './main/http/http.service';
import { AuthService } from './main/auth/auth.service';
import { ProjectService } from './main/service/project.service';
import { ProjectTypeService } from './main/service/project-type.service';
import { PresenceService } from './main/service/presence.service';
import { ParticipantService } from './main/service/participant.service';
import { ParticipantTypeService } from './main/service/participant-type.service';
import { DataService } from './main/service/data.service';
import { PositionService } from './main/service/position.service';
import { ReportService } from './main/service/report.service';
import { CalendarService } from './main/calendar/calendar.service';
import { UserService } from './main/service/user.service';
import { HolidayService } from './main/service/holiday.service';
import { UserTypeService } from './main/service/user-type.service';
import { SalaryService } from './main/service/salary.service';
import { BonusService } from './main/service/bonus.service';
import { DaysOffService } from './main/service/days-off.service';
import { BusinessClientService } from './main/service/business-client.service';
import { ProjectComponent } from './main/project/project.component';
import { EditProjectComponent } from './main/project/edit-project/edit-project.component';
import { TaskComponent } from './main/project/task/task.component';
import { NewProjectComponent } from './main/project/new-project/new-project.component';
import { ProjectDetailsComponent } from './main/project/project-details/project-details.component';
import { EtapeComponent } from './main/project/etape/etape.component';
import { EditEtapeComponent } from './main/project/etape/edit-etape/edit-etape.component';
import { EtapeDetailsComponent } from './main/project/etape/etape-details/etape-details.component';
import { TaskEditComponent } from './main/project/task/task-edit/task-edit.component';
import { LoginComponent } from './main/login/login.component';
import { RegistrationComponent } from './main/registration/registration.component';
import { UsersComponent } from './main/users/users.component';
import { EditUserComponent } from './main/users/edit-user/edit-user.component';
import { ReportComponent } from './main/report/report.component';
import { MonthlyReportComponent } from './main/report/monthly-report/monthly-report.component';
import { EditPresenceComponent } from './main/edit-presence/edit-presence.component';
import { EditPresenceReportComponent } from './main/edit-presence/edit-presence-report/edit-presence-report.component';
import { DialogComponent } from './main/dialog/dialog.component';
import { TaskUserComponent } from './main/project/task/task-user/task-user.component';
import { ProjectUserComponent } from './main/project/project-user/project-user.component';
import { TeamComponent } from './main/team/team.component';
import { NewTeamComponent } from './main/team/new-team/new-team.component';
import { EditTeamComponent } from './main/team/edit-team/edit-team.component';
import { TeamDetailsComponent } from './main/team/team-details/team-details.component';
import { SalariesComponent } from './main/salaries/salaries.component';
import { NewSalaryComponent } from './main/salaries/new-salary/new-salary.component';
import { EditSalaryComponent } from './main/salaries/edit-salary/edit-salary.component';
import { BusinessClientComponent } from './main/business-client/business-client.component';
import { NewBusinessClientComponent } from './main/business-client/new-business-client/new-business-client.component';
import { EditBusinessClientComponent } from './main/business-client/edit-business-client/edit-business-client.component';
import { BonusesComponent } from './main/bonuses/bonuses.component';
import { NewBonusComponent } from './main/bonuses/new-bonus/new-bonus.component';
import { EditBonusComponent } from './main/bonuses/edit-bonus/edit-bonus.component';
import { DaysOffComponent } from './main/days-off/days-off.component';
import { NewDaysOffComponent } from './main/days-off/new-days-off/new-days-off.component';
import { EditDaysOffComponent } from './main/days-off/edit-days-off/edit-days-off.component';
import { ProjectTypeComponent } from './main/project/project-type/project-type.component';
import { NewProjectTypeComponent } from './main/project/project-type/new-project-type/new-project-type.component';
import { UserTypeComponent } from './main/users/user-type/user-type.component';
import { NewUserTypeComponent } from './main/users/user-type/new-user-type/new-user-type.component';
import { ParticipantTypeComponent } from './main/project/participant-type/participant-type.component';
import { NewParticipantTypeComponent } from './main/project/participant-type/new-participant-type/new-participant-type.component';
import { PositionsComponent } from './main/positions/positions.component';
import { NewPositionsComponent } from './main/positions/new-positions/new-positions.component';
import { DaysOffRequestComponent } from './main/days-off-request/days-off-request.component';
import { DialogDeclinedDayOffComponent } from './main/dialog-declined-day-off/dialog-declined-day-off.component';
import { DaysOffUsersComponent } from './main/days-off-users/days-off-users.component';
import { CalendarModule } from './main/calendar/calendar.module';
import { CalendarComponent } from './main/calendar/calendar.component';
import { HolidaysComponent } from './main/holidays/holidays.component';
import { NewHolidayComponent } from './main/holidays/new-holiday/new-holiday.component';
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent},
    { path: 'project', component: ProjectComponent },
    { path: 'new-project', component: NewProjectComponent },
    { path: 'pr/:id/edit', component: EditProjectComponent },
    { path: 'projects/:id/details', component: ProjectDetailsComponent },
    { path: 'projects/:id/etape', component: EtapeComponent },
    { path: 'projects/:id/etape-details', component: EtapeDetailsComponent },
    { path: 'projects/:id/edit-etape', component: EditEtapeComponent },
    { path: 'projects/:id/task', component: TaskComponent },
    { path: 'task-user/:projectId/:userId', component: TaskUserComponent },
    { path: 'user-assigned-pr/:id', component: ProjectUserComponent },
    { path: 'projects/:id/edit-task', component: TaskEditComponent },
    { path: 'users', component: UsersComponent},
    { path: 'edit-user/:id', component: EditUserComponent},
    { path: 'report/:id', component: ReportComponent },
    { path: 'report/:id/:month/:year', component: MonthlyReportComponent },
    { path: 'edit-presence/:id', component: EditPresenceComponent },
    { path: 'edit-presence-report/:id', component: EditPresenceReportComponent },
    { path: 'new-team', component: NewTeamComponent },
    { path: 'team', component: TeamComponent },
    { path: 'edit-team/:id', component: EditTeamComponent },
    { path: 'team-details/:id', component: TeamDetailsComponent },
    { path: 'new-salary', component: NewSalaryComponent },
    { path: 'edit-salary/:id', component: EditSalaryComponent },
    { path: 'salaries', component: SalariesComponent },
    { path: 'business-clients', component: BusinessClientComponent },
    { path: 'new-client', component: NewBusinessClientComponent },
    { path: 'edit-business-client/:id', component: EditBusinessClientComponent },
    { path: 'new-bonus', component: NewBonusComponent },
    { path: 'edit-bonus/:id', component: EditBonusComponent },
    { path: 'bonuses', component: BonusesComponent },
    { path: 'new-days-off', component: NewDaysOffComponent },
    { path: 'edit-days-off/:id', component: EditDaysOffComponent },
    { path: 'days-off', component: DaysOffComponent },
    { path: 'new-project-type', component: NewProjectTypeComponent },
    { path: 'project-types', component: ProjectTypeComponent },
    { path: 'new-participant-type', component: NewParticipantTypeComponent },
    { path: 'participant-types', component: ParticipantTypeComponent },
    { path: 'new-user-type', component: NewUserTypeComponent },
    { path: 'user-types', component: UserTypeComponent },
    { path: 'positions', component: PositionsComponent },
    { path: 'new-position', component: NewPositionsComponent },
    { path: 'days-off-requests', component: DaysOffRequestComponent },
    { path: 'days-off-per', component: DaysOffUsersComponent
    , children: [
        { path: ':id/calendar', component: CalendarComponent }
    ] },
    { path: 'holidays', component: HolidaysComponent },
    { path: 'new-holiday', component: NewHolidayComponent }

];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProjectComponent,
        EditProjectComponent,
        TaskComponent,
        NewProjectComponent,
        ProjectDetailsComponent,
        EtapeComponent,
        EditEtapeComponent,
        EtapeDetailsComponent,
        TaskEditComponent,
        LoginComponent,
        RegistrationComponent,
        UsersComponent,
        EditUserComponent,
        ReportComponent,
        MonthlyReportComponent,
        EditPresenceComponent,
        EditPresenceReportComponent,
        DialogComponent,
        TaskUserComponent,
        ProjectUserComponent,
        TeamComponent,
        NewTeamComponent,
        EditTeamComponent,
        TeamDetailsComponent,
        SalariesComponent,
        NewSalaryComponent,
        EditSalaryComponent,
        BusinessClientComponent,
        NewBusinessClientComponent,
        EditBusinessClientComponent,
        BonusesComponent,
        NewBonusComponent,
        EditBonusComponent,
        DaysOffComponent,
        NewDaysOffComponent,
        EditDaysOffComponent,
        ProjectTypeComponent,
        NewProjectTypeComponent,
        UserTypeComponent,
        NewUserTypeComponent,
        ParticipantTypeComponent,
        NewParticipantTypeComponent,
        PositionsComponent,
        NewPositionsComponent,
        DaysOffRequestComponent,
        DialogDeclinedDayOffComponent,
        DaysOffUsersComponent,
        HolidaysComponent,
        NewHolidayComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CalendarModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatToolbarModule,
        ColorPickerModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FuseWidgetModule,

        // App modules
        LayoutModule,
        FormsModule,
        NgbModule.forRoot()

    ],
    providers: [
              HttpService,
              AuthService,
              ProjectService,
              PresenceService,
              ParticipantService,
              UserService,
              ReportService,
              DatePipe,
              DataService,
              SalaryService,
              BusinessClientService,
              BonusService,
              DaysOffService,
              ProjectTypeService,
              ParticipantTypeService,
              UserTypeService,
              PositionService,
              HolidayService,
              CalendarService
              ],
    bootstrap   : [
        AppComponent
    ],
    entryComponents: [DialogComponent, DialogDeclinedDayOffComponent]
})
export class AppModule
{
}
