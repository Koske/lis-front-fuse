import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../../http/http.service";
import { ProjectService } from "../../service/project.service";
import { DataService } from '../../service/data.service';
import { ParticipantService } from '../../service/participant.service';
import { UserService } from '../../service/user.service';
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.scss']
})
export class ProjectUserComponent implements OnInit {
    
    @ViewChild('checkbox') checkbox;
    private _unsubscribeAll: Subject<any>;
    form: FormGroup;
    projectsIter :any[] = [];
    projects :any[];
    searchPages: any;
    displayedColumns: string[] = ['name', 'description', 'start_date', 'estimated_duration', 'finished'];
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
    userId: any;
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
                private participantService: ParticipantService,
                private userService: UserService,
                private _formBuilder: FormBuilder,
                private datePipe: DatePipe) { 
        this._unsubscribeAll = new Subject();

                 }

    ngOnInit() {
      this.userService.getCurrentUser().subscribe((response: any) => {
        this.userId = response.user.id;
        this.getAllProjects();

      });




      this.form = this._formBuilder.group({

          startDate : [null],
          endDate  : [null],
          dates  : [null]
      });
    }

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

    toggleClick(){
      this.clicked = !this.clicked;
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
        this.onApply();

      }else if(this.filter){
        this.filterProjects();
      }
      else{
        this.getAllProjects();
      }
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

    }

    filterProjects(){

      this.participantService.filterProjectsByUser(this.userId, this.projectForm.startDate, this.projectForm.endDate, this.projectForm.dates, this.filter)
        .subscribe((response: any) => {
             for(let i of response.projects){
               i.start_date = i.start_date.substring(0 ,10);
               i.estimated_duration = i.estimated_duration.substring(0 ,10);
             }
             this.projectsIter = response.projects;
      });
    }

    onReset(){
        this.form.reset();
        this.filterDate = false;
        this.filter = false;
        this.checkbox.checked = false;
        this.getAllProjects();

    }

    getAllProjects(){

      this.participantService.filterProjectsByUser(this.userId, null, null, null, null)
        .subscribe((response: any) => {
             for(let i of response.projects){
               i.start_date = i.start_date.substring(0 ,10);
               i.estimated_duration = i.estimated_duration.substring(0 ,10);
             }
             this.projectsIter = response.projects;
      });
       
    }

    onDetails(){
      if(this.projectId != -1){
        this.id = this.projectId;
        this.router.navigate(['/task-user', this.projectId, this.userId]);
      }
    }

    onApply(){
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

      this.participantService.filterProjectsByUser(this.userId, this.projectForm.startDate, this.projectForm.endDate, this.projectForm.dates, this.filter).subscribe((response: any)=> {
             for(let i of response.projects){
               i.start_date = i.start_date.substring(0 ,10);
               i.estimated_duration = i.estimated_duration.substring(0 ,10);
             }
             this.projectsIter = response.projects;


      });

      }
    }

}