import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { TaskSchedulerService } from '../../service/task-scheduler.service';
import { TaskSchedulerRequest } from '../../dto/task-scheduler-request';
import { TaskScheduler } from '../../entity/task-scheduler';
import { TaskSchedulerActivity } from '../../entity/task-scheduler-activity';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable,Subject } from "rxjs";

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {

config: any; 
taskSchedulerRequestAttributes : TaskSchedulerRequest = new TaskSchedulerRequest();
taskSchedulerObj : TaskScheduler = new TaskScheduler();
taskSchedulerActivityObj : TaskSchedulerActivity = new TaskSchedulerActivity();
taskSchedulerObjList: Observable<TaskScheduler[]>;
taskSchedulerActivityObjList: any;
advanceSearchToggleBtnclickEventstats: boolean = false;
submitted = false;
public date: any;

  constructor(private taskSchedulerService: TaskSchedulerService,private spinner: NgxSpinnerService) {
  	this.config = {
      currentPage: 1,
      itemsPerPage: 50,
      totalItems:3
    };
   }

  ngOnInit() {
  this.getPage(1);
  }

     getPage(page: number) {
      this.spinner.show();
      this.config.currentPage=page;
      //console.log(this.taskSchedulerRequestAttributes);
      this.taskSchedulerService.getAllScheduledTaskByRequest(this.taskSchedulerRequestAttributes,page).subscribe(data =>{

        this.taskSchedulerObjList = this.getScheduledTaskDataContent(data,'content');
        this.config.totalItems = this.getScheduledTaskDataContent(data,'totalElements');
        this.spinner.hide();
      });  
    }

    getActivityList(taskId: number) {
      this.spinner.show();
      this.taskSchedulerService.getAllScheduledTaskActivityByTaskId(taskId).subscribe(data =>{

        this.taskSchedulerActivityObjList = data;
        this.spinner.hide();
      });  
    }


taskSearchForm = new FormGroup({
      task_priority_src:new FormControl('All'),
      follow_up_to_src:new FormControl(),
      task_status_src:new FormControl('All'),
      task_from_date_src:new FormControl(),
      task_to_date_src:new FormControl()
    }); 

taskSchedulerSaveForm=new FormGroup({
	task_scheduler_id:new FormControl(),
    task_name:new FormControl(),
    task_priority:new FormControl('High'),
    task_status:new FormControl('Pending'),
    task_scheduled_date:new FormControl(new Date()),
    follow_up_to:new FormControl(),
    task_description:new FormControl(),
    comment:new FormControl()
  });

  addNewTaskBtnClk(){
        this.taskSchedulerSaveForm.patchValue({
         task_priority:'High',
         task_status:'Pending',
         task_scheduled_date:new Date()});
  }

   
  taskSchedulerActivitySaveForm=new FormGroup({
    activity_task_scheduler_id:new FormControl(),
    activity_task_activity:new FormControl()
  });

    searchItemSubmit(searchItem){
    this.spinner.show();
      this.taskSchedulerRequestAttributes = new TaskSchedulerRequest();
      this.taskSchedulerRequestAttributes.taskStatus = this.TaskStatusSRC.value;
      this.taskSchedulerRequestAttributes.priority = this.PrioritySRC.value;
      this.taskSchedulerRequestAttributes.followUpTo = this.FollowUpToSRC.value;
      this.taskSchedulerRequestAttributes.taskScheduledStartDate = this.TaskScheduledFromDateSRC.value;
      this.taskSchedulerRequestAttributes.taskScheduledEndDate = this.TaskScheduledToDateSRC.value;
      this.getPage(1);
     }

	getUpdateTasks(taskSchedulerId){
	this.taskSchedulerObj=new TaskScheduler();
      this.taskSchedulerService.getScheduledTask(taskSchedulerId).subscribe(data =>{
         this.taskSchedulerSaveForm.patchValue({
         task_scheduler_id:this.UpdatableTask(data,'taskSchedulerId'),
         task_name:this.UpdatableTask(data,'taskName'),
         task_priority:this.UpdatableTask(data,'priority'),
         task_description:this.UpdatableTask(data,'taskDescription'),
         follow_up_to:this.UpdatableTask(data,'followUpTo'),
         task_status:this.UpdatableTask(data,'taskStatus'),
         comment:this.UpdatableTask(data,'comment'),
         task_scheduled_date:new Date(this.UpdatableTask(data,'taskScheduledDate'))});
    });
	}

  getUpdateTasksActivity(taskSchedulerId){
  this.taskSchedulerObj=new TaskScheduler();
      this.taskSchedulerService.getScheduledTask(taskSchedulerId).subscribe(data =>{
         this.taskSchedulerActivitySaveForm.patchValue({
         activity_task_scheduler_id:taskSchedulerId});
         this.getActivityList(taskSchedulerId);
    });
  }
  

  UpdatableTask(updateItemObject:Object,updateItemName:any){
    return updateItemObject[updateItemName];
  }

    saveTaskActivity(taskActivity){
      this.taskSchedulerActivityObj = new TaskSchedulerActivity();
      this.taskSchedulerActivityObj.taskSchedulerId=this.ActivityTaskSchedulerId.value;
      this.taskSchedulerActivityObj.taskActivity=this.ActivityTaskActivity.value;
      this.taskSchedulerService.createScheduledTaskActivity(this.taskSchedulerActivityObj)
      .subscribe(data => {
      this.getActivityList(this.ActivityTaskSchedulerId.value);
      });
    this.taskSchedulerActivityObj = new TaskSchedulerActivity();
    }

    saveAndUpdateScheduledTask(saveItem){
    this.taskSchedulerObj = new TaskScheduler();
    this.taskSchedulerObj.taskSchedulerId=this.TaskSchedulerId.value;
    this.taskSchedulerObj.taskName=this.TaskName.value;
    this.taskSchedulerObj.priority=this.Priority.value;
    this.taskSchedulerObj.taskDescription=this.TaskDescription.value;
    this.taskSchedulerObj.followUpTo=this.FollowUpTo.value;
    this.taskSchedulerObj.taskStatus=this.TaskStatus.value;
    this.taskSchedulerObj.comment=this.Comment.value;
    this.taskSchedulerObj.taskScheduledDate=this.TaskScheduledDate.value;
    this.submitted = true;

    if(this.TaskSchedulerId.value==null || this.TaskSchedulerId.value==''){
         this.saveScheduledTask();
         this.taskSchedulerSaveForm.reset();
    }else{
        this.taskSchedulerObj.taskSchedulerId=this.TaskSchedulerId.value;
        this.updateScheduledTask();
        this.taskSchedulerSaveForm.reset();
    }
    this.submitted=false;
  }  



  saveScheduledTask() {
    this.taskSchedulerService.createScheduledTask(this.taskSchedulerObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.taskSchedulerObj = new TaskScheduler();
  } 

  updateScheduledTask(){
    this.taskSchedulerService.updateScheduledTask(this.taskSchedulerObj.taskSchedulerId,this.taskSchedulerObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.taskSchedulerObj = new TaskScheduler();
  }


  getRemoveTask(itemid){
      if(confirm("Are you sure to delete this Task "+itemid)) {
        //console.log("Implement delete functionality here");
        this.taskSchedulerService.deleteScheduledTask(itemid)
            .subscribe(data => {
            this.getPage(this.config.currentPage);
        });
        }
    }

 getScheduledTaskDataContent(responseData:Object,contentName:any){
 // console.log(responseData[contentName]);
    return responseData[contentName];
  }

   modalCloseJquery(){
    setTimeout(function() { 
          this.$('#releasemodal').modal('hide'); 
          this.$("#itemSubmitButton").prop('disabled', false);
          this.$("#itemSubmitButton").prop('class', 'btn btn-info');
          this.$("#itemSubmitButton").text("Save changes");
        }, 1000);
  }

  getColorClass(role: string) {
  let returnValue;
  switch (role) {
  case 'Done':
    returnValue = 'done';
    break;
  case 'Pending':
    returnValue = 'pending';
    break;
  case 'Inprogress':
    returnValue = 'inprogress';
    break;
  default:
    returnValue = 'white';
}

return returnValue ;
}

  get TaskSchedulerId(){
    return this.taskSchedulerSaveForm.get('task_scheduler_id');
  }

  get TaskName(){
    return this.taskSchedulerSaveForm.get('task_name');
  }
  get Priority(){
    return this.taskSchedulerSaveForm.get('task_priority');
  }
  get PrioritySRC(){
    return this.taskSearchForm.get('task_priority_src');
  }
  get TaskDescription(){
    return this.taskSchedulerSaveForm.get('task_description');
  }
  get FollowUpTo(){
    return this.taskSchedulerSaveForm.get('follow_up_to');
  }
  get FollowUpToSRC(){
    return this.taskSearchForm.get('follow_up_to_src');
  }
  get TaskStatus(){
    return this.taskSchedulerSaveForm.get('task_status');
  }
  get TaskStatusSRC(){
    return this.taskSearchForm.get('task_status_src');
  }
  get Comment(){
    return this.taskSchedulerSaveForm.get('comment');
  }
  get TaskScheduledDate(){
    return this.taskSchedulerSaveForm.get('task_scheduled_date');
  }
  get TaskScheduledFromDateSRC(){
    return this.taskSearchForm.get('task_from_date_src');
  }
  get TaskScheduledToDateSRC(){
    return this.taskSearchForm.get('task_to_date_src');
  }

  get ActivityTaskSchedulerId(){
    return this.taskSchedulerActivitySaveForm.get('activity_task_scheduler_id');
  }

  get ActivityTaskActivity(){
    return this.taskSchedulerActivitySaveForm.get('activity_task_activity');
  }

  
  

}
