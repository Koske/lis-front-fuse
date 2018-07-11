import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PresenceService } from '../service/presence.service';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations   : fuseAnimations
})
export class HomeComponent implements OnInit {
    checkedInOut: boolean;
    user_checked: any;
    business_checked: boolean = false;
    prjNum = 0;

    constructor(private authService: AuthService,
                private presenceService: PresenceService,
                private projectService: ProjectService,
                private userService: UserService) { }

    ngOnInit() {
        this.business_checked = false;
        this.presenceService.userIsCheckedIn().subscribe(
          data => {
            this.user_checked = data;
            this.checkedInOut = this.user_checked.checkedIn;
          }
        );

        this.projectService.getProjects().subscribe((response: any) => {
          for(const el of response){
              this.prjNum++;
          }
        });
    }

    onLogout() {
        this.authService.logout();
    }

    onCheckIn() {
        this.presenceService.checkIn().subscribe(
          data => {
            this.checkedInOut = true;
          }
        );
    }

    onCheckOut() {
        this.presenceService.checkOut(this.business_checked).subscribe(
          data => {
            this.checkedInOut = false;
            this.business_checked = false;
          }
        );
    }




}
