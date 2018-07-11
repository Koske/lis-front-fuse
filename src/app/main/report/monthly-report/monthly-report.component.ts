import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ReportService } from "../../service/report.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {
  userId: any;
  month: any;
  year: any;
  chart = [];

  constructor(private route: ActivatedRoute,
  			  private router: Router,
      		  private reportService: ReportService) { }

  ngOnInit() {
  	this.userId = {
     id: this.route.snapshot.params['id']
   };
    this.month = this.route.snapshot.params['month'];
    this.year = this.route.snapshot.params['year'];

    this.reportService.getInfoForMonth(this.userId, this.year, this.month).subscribe((response: any) => {
  		
    	let check_instr = [];
    	let check_outstr = [];
    	let check_in = [];
    	let check_out = [];
    	let dates = [];
      let pointBackgroundColors = [];
    	let hours = 0;
    	let minutes = 0;
    	let seconds = 0;
    	console.log(response.presence);

    	for(let i of response.presence){
    		check_instr.push(i.start.substring(11, 19));
    		check_outstr.push(i.end.substring(11, 19));
    		dates.push(i.start.substring(0, 10));
          
          if(i.eight_hours == true){
            pointBackgroundColors.push('green');
          }else if(i.business_check_out){
            pointBackgroundColors.push('purple');
          }else{
            pointBackgroundColors.push('red');
          }
    	}

    	check_instr.forEach((res)=> {
    		hours = (parseInt(res.substring(0, 2)))*3600;
    		minutes = (parseInt(res.substring(3, 5)))*60;
    		seconds = (parseInt(res.substring(6, 8)));

    		let total = hours+minutes+seconds;

    		check_in.push(total);
    	});

	  	check_outstr.forEach((res)=> {
    		hours = (parseInt(res.substring(0, 2)))*3600;
    		minutes = (parseInt(res.substring(3, 5)))*60;
    		seconds = (parseInt(res.substring(6, 8)));

    		let total = hours+minutes+seconds;

    		check_out.push(total);
    	});

    	console.log(check_in, check_out);

    	Chart.defaults.global.defaultFontFamily = 'Arial';
    	Chart.defaults.global.defaultFontColor = 'black';
      Chart.defaults.scale.gridLines.color = 'black';
      Chart.defaults.scale.gridLines.lineWidth = 0.2;
    	this.chart = new Chart('canvas', {
    		type: 'line',
    		data: {
    			labels: dates,
    			datasets: [
    				{
    					data: check_in,
    					borderColor: '#3cba9f',
    					fill: false,
    					label: "Check in",
			            pointRadius: 4
    				},
    				{
    					data: check_out,
    					borderColor: '#ffcc00',
    					fill: false,
    					label: "Check out",
		                pointBackgroundColor: pointBackgroundColors,
		                pointRadius: 4
    				},
    				{
    					label: "Not eight hours",
    					borderColor: 'red',
    					backgroundColor: 'red'
    				},
    				{
    					label: "Business check out",
    					borderColor: 'purple',
    					backgroundColor: 'purple'
    				}
    			]
    		},
    		options: {
    			legend:{
    				display: true
    			},
    			scales: {
    				yAxes: [{
    					ticks: {
			            userCallback: function(v) { return new Date(v*1000).toISOString().substr(11, 8) },
			            stepSize: 30 * 60
          }
                
    				}]
    			},
    			tooltips: {
			        callbacks: {
			          label: function(tooltipItem, data) {
			            return "Time" + ': ' + new Date(tooltipItem.yLabel*1000).toISOString().substr(11, 8);
			          }
			        }
			    }
    		}
    	})

  		console.log(check_instr, check_outstr);
  	});
  }
  epoch_to_hh_mm_ss(epoch) {
    return new Date(epoch*1000).toISOString().substr(11, 8);
  }

}
