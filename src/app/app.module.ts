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

import { DatePipe } from '@angular/common';

import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule, FuseWidgetModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { HomeComponent } from './main/home/home.component';
import { HttpService } from './main/http/http.service';
import { AuthService } from './main/auth/auth.service';
import { ProjectService } from './main/service/project.service';
import { PresenceService } from './main/service/presence.service';
import { ParticipantService } from './main/service/participant.service';
import { DataService } from './main/service/data.service';
import { ReportService } from './main/service/report.service';
import { UserService } from './main/service/user.service';
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
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent},
    { path: 'project', component: ProjectComponent },
    { path: 'new-project', component: NewProjectComponent },
    { path: 'projects/:id/edit', component: EditProjectComponent },
    { path: 'projects/:id/details', component: ProjectDetailsComponent },
    { path: 'projects/:id/etape', component: EtapeComponent },
    { path: 'projects/:id/etape-details', component: EtapeDetailsComponent },
    { path: 'projects/:id/edit-etape', component: EditEtapeComponent },
    { path: 'projects/:id/task', component: TaskComponent },
    { path: 'task-user/:projectId/:userId', component: TaskUserComponent },
    { path: 'project-user/:id', component: ProjectUserComponent },
    { path: 'projects/:id/edit-task', component: TaskEditComponent },
    { path: 'users', component: UsersComponent},
    { path: 'edit-user/:id', component: EditUserComponent},
    { path: 'report/:id', component: ReportComponent },
    { path: 'report/:id/:month/:year', component: MonthlyReportComponent },
    { path: 'edit-presence/:id', component: EditPresenceComponent },
    { path: 'edit-presence-report/:id', component: EditPresenceReportComponent }

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
        ProjectUserComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
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

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FuseWidgetModule,

        // App modules
        LayoutModule,
        FormsModule
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
              DataService
              ],
    bootstrap   : [
        AppComponent
    ],
    entryComponents: [DialogComponent]
})
export class AppModule
{
}
