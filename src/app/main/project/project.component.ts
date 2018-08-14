import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from "../http/http.service";
import { ProjectService } from "../service/project.service";
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-projects',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    @ViewChild('checkbox') checkbox;
    formErrors: any;  
    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
    projectsIter :any[] = [];
    projects :any[];
    searchPages: any;
    displayedColumns = ['name', 'description', 'projectType', 'start_date', 'estimated_duration', 'finished'];
    id: number;
    pages: any[] = [];
    totalPages = {
      total_pages: []
    };
    projectId: number = -1;
    again: boolean = true;
    filter: boolean = false;
    total: number = 0;
    currentPage: number = 1;
    searchTerm: string;
    user: any;
    clicked: boolean = false;
    projectForm = {
      startDate: null,
      endDate: null,
      dates: null
    }
    filterDate: boolean = false;
    dates = [
      {value: 'unixStartDate', viewValue: 'Start date'},
      {value: 'unixEstimatedDuration', viewValue: 'Estimated'}
    ];
    applied: boolean = false;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(private router: Router,
                private projectService: ProjectService,
                private dataService: DataService,
                private userService: UserService,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) 
    {

        this._unsubscribeAll = new Subject();
    }


    ngOnInit() {

      this.form = this._formBuilder.group({

          startDate : [null],
          endDate  : [null],
          dates  : [null]
      });




        this.getAllProjects(1);
            this.dataService.currentMessage.subscribe(message => {
              this.searchTerm = message;
              console.log(this.searchTerm);
              if(this.searchTerm!= ''){
                this.search(1, this.searchTerm);
              }else if(this.filter){
                this.filterProjects(1);
              }else{
                this.getAllProjects(1);
              }
            });

    }

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

    search(page, searchTerm){
      this.projectService.searchProject(this.filter, page, 5, searchTerm).subscribe((response: any) => {
        
        this.searchPages = response;
        this.pages = [];
         this.projectsIter = response.projects;
         this.projects = response.projects;
         for(let el of this.projectsIter){
           el.estimated_duration = el.estimated_duration.substring(0, 10);
           el.start_date = el.start_date.substring(0, 10);
         }
         this.totalPages = response;
         this.total = response.total_pages;

         if(page == 1){
           for(let i = 1; i <= response.total_pages; i++){
             if(i>3){
               break;
             }
             this.pages.push(i);
           }
         }else{
           if(page == this.total && page-2!=0)
             this.pages.push(page-2);
           this.pages.push(page-1);
           this.pages.push(page);
           if(this.total > page)
             this.pages.push(page+1);
         }
         this.totalPages.total_pages = this.pages;
        
      });
    }

    toggleClick(){
      this.clicked = !this.clicked;
    }

    stashInfo(prId){
      if(this.projectId == prId){
        this.projectId = -1;
        let table = document.getElementById(prId);
        table.classList.toggle("active");
      }else if(this.projectId!= -1){
        let id = this.projectId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");

        this.projectId = prId;
        let id2 = this.projectId.toString();
        table = document.getElementById(id2);
        table.classList.toggle("active");
      }else{
        this.projectId = prId;

        let table = document.getElementById(prId);
        table.classList.toggle("active");
      }

       console.log(this.projectId);
    }


    getAllProjects(page){
      this.projectService.getProjectsPP(page, 5)
        .subscribe((response: any) => {
          this.pages = [];
          this.projectsIter = [];
          this.projectsIter = response.projects;
          this.projects = response;
          this.currentPage = page;
          for(let el of this.projectsIter){
            el.estimated_duration = el.estimated_duration.substring(0, 10);
            el.start_date = el.start_date.substring(0, 10);
          }
          this.totalPages = response;
          this.total = response.total_pages;
          if(page == 1){
            for(let i = 1; i <= response.total_pages; i++){
              if(i>3){
                break;
              }
              this.pages.push(i);
            }
          }else{
              if(page == this.total && page-2!=0)
                this.pages.push(page-2);
              this.pages.push(page-1);
              this.pages.push(page);
              if(this.total > page)
               this.pages.push(page+1);
          }

          this.totalPages.total_pages = this.pages;
          console.log(this.projectsIter);
        });
    }

    filterProjects(page){

      this.projectService.filterProject(this.filter, page, 5, null, null, null)
        .subscribe((response: any) => {
          this.pages = [];
          this.projectsIter = response.projects;
          this.projects = response;
          this.currentPage = page;

          for(let el of this.projectsIter){
            el.estimated_duration = el.estimated_duration.substring(0, 10);
            el.start_date = el.start_date.substring(0, 10);
          }
          this.totalPages = response;
          this.total = response.total_pages;

          if(page == 1){
            for(let i = 1; i <= response.total_pages; i++){
              if(i>3){
                break;
              }
              this.pages.push(i);
            }
          }else{
            if(page == this.total && page-2!=0)
              this.pages.push(page-2);
            this.pages.push(page-1);
            this.pages.push(page);
            if(this.total > page)
              this.pages.push(page+1);
         }
        
         this.totalPages.total_pages = this.pages;
      });
    }

    toggleFilter(){
      if(this.projectId!=-1){
        let id2 = this.projectId.toString();
        let table = document.getElementById(id2);
        table.classList.toggle("active");
        this.projectId = -1;
      }
        this.filter = !this.filter;
      if(this.filterDate){
        this.onApply(1);

      }else if(this.filter){
        this.filterProjects(1);
      }
      else{
        this.getAllProjects(1);
      }
    }



    newPage(page){
      if(this.projectId!=-1){
        let id2 = this.projectId.toString();
        let table = document.getElementById(id2);
        table.classList.toggle("active");
        this.projectId = -1;
      }
      if(this.filterDate){
        this.onApply(page);

      }else if(this.filter){
        this.filterProjects(page);
      }
      else{
        this.getAllProjects(page);
      }
    }

    lastPage(){
      this.getAllProjects(this.total);
    }

    onFinish(){
      if(this.projectId!= -1){
        this.projectService.finishProject(this.projectId);
         
        let id = this.projectId.toString();
        let table = document.getElementById(id);
        table.classList.toggle("active");
        this.projectId = -1;
        if(this.filter){
          this.filterProjects(this.currentPage);
        }else{
          this.getAllProjects(this.currentPage);
        }
      }
    }

    onEdit(){
      if(this.projectId != -1){
        this.router.navigate(['/pr', this.projectId, 'edit']);
      }
    }

    onRemove(){
      if(this.projectId != -1){
        if(confirm("Are you sure you want to delete this project?")) {
          this.id = this.projectId;
          this.projectId = -1;
          this.projectService.removeProject(this.id);
          setTimeout( () => {
            if(this.filter){
              this.filterProjects(this.currentPage);
            }else{
              this.getAllProjects(this.currentPage);
            }
          },1000);
            

        }
      }
    }

    onDetails(){
      if(this.projectId != -1){
        this.id = this.projectId;
        this.router.navigate(['/projects', this.projectId, 'details']);
      }
    }
      /**
     * On form values changed
     */
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

    onReset(){
        this.form.reset();
        this.filterDate = false;
        this.filter = false;
        this.checkbox.checked = false;
        this.getAllProjects(1);

        setTimeout( () => {
          this.form.reset();
          this.filterDate = false;
          this.filter = false;
          this.checkbox.checked = false;
          this.getAllProjects(1);
        },500);
    }

    onApply(page){
      if(this.form.value.dates!= null && (this.form.value.startDate!= null || this.form.value.endDate!= null)){
        this.filterDate = true;
        if(this.form.value.startDate){
          this.projectForm.startDate = this.datePipe.transform(new Date(this.form.value.startDate), 'shortDate');
        }else{
          this.projectForm.startDate = '';
        }
        if(this.form.value.endDate){
          this.projectForm.endDate = this.datePipe.transform(new Date(this.form.value.endDate), 'shortDate');
        }else{
          this.projectForm.endDate = '';
        }

        
        
        this.projectForm.dates = this.form.value.dates;
        this.projectService.filterProject(this.filter, page, 5, this.projectForm.startDate, this.projectForm.endDate, this.projectForm.dates).subscribe((response: any)=> {
            this.pages = [];
            this.projectsIter = response.projects;
            this.projects = response;
            this.currentPage = page;
        console.log(response.projects);

            for(let el of this.projectsIter){
              el.estimated_duration = el.estimated_duration.substring(0, 10);
              el.start_date = el.start_date.substring(0, 10);
            }
            this.totalPages = response;
            this.total = response.total_pages;

            if(page == 1){
              for(let i = 1; i <= response.total_pages; i++){
                if(i>3){
                  break;
                }
                this.pages.push(i);
              }
            }else{
              if(page == this.total && page-2!=0)
                this.pages.push(page-2);
              this.pages.push(page-1);
              this.pages.push(page);
              if(this.total > page)
                this.pages.push(page+1);
           }
          
           this.totalPages.total_pages = this.pages;
        });
      }
    }


}
