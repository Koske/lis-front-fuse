import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { AuthService } from '../../../main/auth/auth.service';
import { UserService } from '../../../main/service/user.service';
import { DaysOffService } from '../../../main/service/days-off.service';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';

@Component({
    selector   : 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    userStatusOptions: any[];
    user: any;
    pendingCounter: number = 0;
    show: boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private _translateService: TranslateService,
        private authService: AuthService,
        private userService: UserService,
        private daysOffService: DaysOffService,
        private route: ActivatedRoute,
        private router: Router
    )
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'tr',
                title: 'Turkish',
                flag : 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     getPendings(){
        this.daysOffService.getDaysOff().subscribe((response: any)=> {
            this.pendingCounter =0;
            response.daysOff.forEach((r)=> {
                if(r.status == 'Pending')
                    this.pendingCounter++;
            });
        });
     }
    ngOnInit(): void
    {
          // setInterval( () => {
          //   this.getPendings();
          // },10000);
        
        // Subscribe to the router events to show/hide the loading bar
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event) => {
                this.showLoadingBar = true;
            });

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                this.showLoadingBar = false;
            });

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});
        this.userService.getCurrentUser().subscribe((response:any) => {
            this.user =response.user;
            if(response.role[0] == 'ROLE_SUPER_ADMIN'){
                this.show = true;
            }else{
                this.show = false;
            }

        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param langId
     */
    setLanguage(langId): void
    {
        // Set the selected language for toolbar
        this.selectedLanguage = _.find(this.languages, {'id': langId});

        // Use the selected language for translations
        this._translateService.use(langId);
    }
    onLogout() {
        this.authService.logout();
    } 

    onEditPresence(){
        this.router.navigate(['/edit-presence', this.user.id]);
    }

    onMyProjects(){
        this.router.navigate(['/user-assigned-pr', this.user.id]);
    }

    onNotifications(){
        this.router.navigate(['days-off-requests']);
    }
}
