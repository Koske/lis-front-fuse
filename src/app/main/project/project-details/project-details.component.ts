import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from "../../service/project.service";
import { ParticipantService } from "../../service/participant.service";
import { ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

@ViewChild('t') taskForm: NgForm;

    constructor(private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router,
                private participantService: ParticipantService) { }

    projectId = {
      id: 0
    }
    projectName = '';
    deadlineNear: boolean = false;
    dateCurrent: any ;
    dateEstimated: any;
    etap: any[];
    again: boolean = true;
    nonePart: any[] = [];
    participants: any[] = [];
    nonParticipantId = 0;
    participantId = 0;
    interval: any;
    participantTypes: any[] =[];
    proba: any;
    etapId: any[] = [];
    displayedColumns = ['first_name', 'last_name', 'position', 'team'];
    displayedColumns1 = ['first_name', 'last_name', 'participant_type', 'team'];
    displayedColumns2 = ['name', 'description', 'start', 'end', 'progress'];


    ngOnInit() {
        this.projectId = {
            id: this.route.snapshot.params['id']
        };

        this.projectService.getProjects()
          .subscribe((response: any) => {
            for(let el of response){
              if(el.id == this.projectId.id){
                this.projectName = el.name;
              }
            }
        });
       
      this.getParticipantsForProject();
      this.getNotParticipants();

      
      this.projectService.setEtapeHours(this.projectId.id);
      

      this.projectService.getEtapeByProject(this.projectId.id)
          .subscribe((response: any) => {
            for(let el of response.etapes){
              el.start = el.start.substring(0, 10);
              el.end = el.end.substring(0, 10);
            }
            this.etap = response.etapes;
            console.log(this.etap);
            this.calculatePercentage();
          });

      this.participantService.getParticipantTypese()
          .subscribe((response: any) => {
            for(let e of response.participant_types){
              this.participantTypes.push(e);
            }
            console.log(this.participantTypes);
          });
    }

    getNotParticipants(){
      this.participantService.getUnparticapants(this.projectId.id)
        .subscribe((response: any) => {
          this.nonePart = [];
            for(let el of response.users){
              this.nonePart.push(el);
            }
            console.log(this.nonePart);
        });
    }



    getParticipantsForProject(){
      this.participantService.getParticipants(this.projectId.id)
        .subscribe((response: any) => {
          this.participants = [];
          for(let el of response.part){
            this.participants.push(el);
          }
          console.log(this.participants); 
        });
    }

    userToParticipant(){
      if(this.nonParticipantId!=0){
        this.participantService.addParticipant(this.projectId.id, this.nonParticipantId, this.taskForm.value.pt);
        this.participantId =0;
        this.nonParticipantId =0;
        this.getParticipantsForProject(); 
        this.getNotParticipants();
          
      }
    }
  
    participantToUser(){
      if(this.participantId!=0){

        this.participantService.removeParticipant(this.projectId.id, this.participantId)
          .subscribe((response: any) => {
            this.participantId = 0;
            this.nonParticipantId = 0;
            this.getParticipantsForProject(); 
            this.getNotParticipants();
          });
      }
    }

    nonPartId(id){ 
      if(this.participantId){
        let id1 = this.participantId.toString();
        let table = document.getElementById(id1);
        table.classList.toggle("active");
        this.participantId = 0;
      }
      if(this.nonParticipantId == id){
        let table = document.getElementById(id);
        table.classList.toggle("active");
        this.nonParticipantId =0;
      }else if(this.nonParticipantId!=0){
        let id1 = this.nonParticipantId.toString();

        let table = document.getElementById(id1);
        table.classList.toggle("active");

        this.nonParticipantId = id;
        let id2 = this.nonParticipantId.toString();
        let table1 = document.getElementById(id2);
        table1.classList.toggle("active");
      }else{
        this.nonParticipantId = id;
        let table = document.getElementById(id);
        table.classList.toggle("active");
      }
      console.log("User id:" + this.nonParticipantId);
    }

    partId(id){
      if(this.nonParticipantId){
        let id1 = this.nonParticipantId.toString();
        let table = document.getElementById(id1);
        table.classList.toggle("active");
        this.nonParticipantId = 0;
      }
        
      if(this.participantId == id){
        let table = document.getElementById(id);
        table.classList.toggle("active");
        this.participantId =0;
      }else if(this.participantId!=0){
        let id1 = this.participantId.toString();

        let table = document.getElementById(id1);
        table.classList.toggle("active");

        this.participantId = id;
        let id2 = this.participantId.toString();
        let table1 = document.getElementById(id2);
        table1.classList.toggle("active");
      }else{
        this.participantId = id;
        let table = document.getElementById(id);
        table.classList.toggle("active");
      }
      console.log("Participant id:" + this.participantId);
    }
  
    calculatePercentage(){
      for(let el of this.etap){
        if(el.hours_completed){
          el.percentage = Math.round(100/((el.hours_completed + el.hours_not_completed)/el.hours_completed));
        }else{
          el.percentage = 0;
        }
      }
        console.log(this.etap);
    }

    onAddEtape(){
      this.router.navigate(['/projects', this.projectId.id, 'etape']);
    }

}
