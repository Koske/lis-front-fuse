import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../../app/main/service/data.service'
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';

@Component({
    selector   : 'fuse-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class FuseSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    fuseConfig: any;

    @Output()
    input: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
              private _fuseConfigService: FuseConfigService,
              private router: Router,
              private dataService: DataService
    )
    {
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.fuseConfig = config;
                }
            );

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
     * Collapse
     */
    collapse(): void
    {
        this.collapsed = true;
        (<HTMLInputElement>document.getElementById('fuse-search-bar-input')).value = '';
        this.dataService.changeMessage('');
    }

    /**
     * Expand
     */
    expand(): void
    {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void
    {
        this.input.emit(event.target.value);

        this.dataService.changeMessage(event.target.value);
    }

}
