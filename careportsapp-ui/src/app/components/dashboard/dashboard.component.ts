import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from '../../service/dashboard.service';
import { ApplicationUsers } from '../../entity/application-users';
import { Observable,Subject } from "rxjs";
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


applicationUsersObjList: Observable<ApplicationUsers[]>; 
applicationList:any;

constructor(private dashboardService: DashboardService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  this.getConfiguration();
  }

  getConfiguration(){
  GlobalConstants.allApplicationNames = [];
  GlobalConstants.allDevSprintNames = [];
  this.spinner.show();
  	this.dashboardService.getAllApplicatonUsers().subscribe(data =>{
  		this.processApplicationUsers(data);
      });  
      this.dashboardService.getAllApplicatons().subscribe(data =>{
      localStorage.setItem('APPLICATION_NAMES', JSON.stringify(data));
      }); 

      this.dashboardService.getDevSprints().subscribe(data =>{
  		localStorage.setItem('DEV_SPRINT_NAMES', JSON.stringify(data));        
      });  
      this.spinner.hide();
  }


  processApplicationUsers(applicationUsersObjList : ApplicationUsers[]){
	  GlobalConstants.allSupUsers = [];
	  GlobalConstants.allDevUsers = [];
	  for(var appObj of applicationUsersObjList){
	  switch(appObj.userRole){
		  case 'SUP':
		  GlobalConstants.allSupUsers.push(appObj.userFullName);
		  break;
		  case 'DEV':
		  GlobalConstants.allDevUsers.push(appObj.userFullName);
		  break;
	  	}
	  }
    localStorage.setItem('SUP_USER', JSON.stringify(GlobalConstants.allSupUsers));
    localStorage.setItem('DEV_USER', JSON.stringify(GlobalConstants.allDevUsers));
  }

}
