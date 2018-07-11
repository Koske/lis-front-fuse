import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../../service/presence.service';
import { ActivatedRoute} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-edit-presence-report',
    templateUrl: './edit-presence-report.component.html',
    styleUrls: ['./edit-presence-report.component.scss']
})
export class EditPresenceReportComponent implements OnInit {

    userId: any;
    presences: any;
    fullUserName: string = '';
    displayedColumns = ['originalStart','originalEnd', 'start', 'end'];

    constructor(private route: ActivatedRoute,
    			      private presenceService: PresenceService) { }

  ngOnInit() {
    	this.userId = this.route.snapshot.params['id'];

     	this.presenceService.getEditedPresencesByUser(this.userId).subscribe((response: any) => {
   		
   		this.presences = response.presences;
   		this.fullUserName = response.user.first_name + ' ' + response.user.last_name;
   		console.log(response);
   			for(let p of this.presences){
   				if(p.start){
   					p.start = p.start.substring(0, 10) + ' ' + p.start.substring(11, 16);
   				}
   				if(p.end){
					p.end = p.end.substring(0, 10) + ' ' + p.end.substring(11, 16);
				}

				p.original_start = p.original_start.substring(0, 10) + ' ' + p.original_start.substring(11, 16);
				p.original_end = p.original_end.substring(0, 10) + ' ' + p.original_end.substring(11, 16);
   			}
   		
   		});


  }

}
