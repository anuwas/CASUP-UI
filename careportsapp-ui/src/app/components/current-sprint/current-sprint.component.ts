import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { DevItemService } from '../../service/devitem.service';
import { AngularTreeGridComponent } from 'angular-tree-grid';
import { NgxSpinnerService } from "ngx-spinner";
import{ GlobalConstants } from '../../common/global-constants';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { Dailyscrumactivity } from '../../entity/dailyscrumactivity';
import { Devitem } from '../../entity/devitem';

declare var $: any;

@Component({
  selector: 'app-current-sprint',
  templateUrl: './current-sprint.component.html',
  styleUrls: ['./current-sprint.component.css']
})
export class CurrentSprintComponent implements OnInit {


@ViewChild('angularGrid', { static: false }) angularGrid: AngularTreeGridComponent;
devitemObjList: any = [];
devItemActivityObjList:any = [];

devitemObjActivity : Devitem =new Devitem();
devitemActivityObj : Dailyscrumactivity = new Dailyscrumactivity();


  constructor(private devitemService: DevItemService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  	this.getPage(GlobalConstants.getCurrentSprint());
  }

   getPage(currentSprint: string) {
      this.spinner.show();
      this.devitemService.getDevCurrentSprintItemList(currentSprint).subscribe(data =>{
        this.devitemObjList = data;
        this.spinner.hide();
      });  
    }

  taskSchedulerActivitySaveForm=new FormGroup({
    activity_current_status:new FormControl()
  });


  /*
  data: any = [
    { devItemId: 1, itemNumber: 'Bimal', developerName:'Bappa',itemStoryPoint: 60, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 0},
    { devItemId: 2, itemNumber: 'Bhagi', developerName:'Bappa',itemStoryPoint: 40, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 1},
    { devItemId: 3, itemNumber: 'Kalyana', developerName:'Bappa',itemStoryPoint: 36, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 1},
    { devItemId: 4, itemNumber: 'Prakash', developerName:'Bappa',itemStoryPoint: 20, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 1},
    { devItemId: 5, itemNumber: 'Jitu', developerName:'Bappa',itemStoryPoint: 21, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 1},
    { devItemId: 6, itemNumber: 'Sunil', developerName:'Bappa',itemStoryPoint: 60, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 0},
    { devItemId: 7, itemNumber: 'Tadit', developerName:'Bappa',itemStoryPoint: 40, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 6},
    { devItemId: 8, itemNumber: 'Suraj', developerName:'Bappa',itemStoryPoint: 36, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 6},
    { devItemId: 9, itemNumber: 'Swarup', developerName:'Bappa',itemStoryPoint: 20, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 6},
    { devItemId: 10, itemNumber: 'Lakin', developerName:'Bappa',itemStoryPoint: 21, itemSubject: 'RVS Changes - Go Live Preparation/Instructions', itemStatus: 'Inprogress', applicationName: 'STS', itemType:'Story',itemParentId: 6},
  ];
  */

configs: any = {
      id_field: 'devItemId',
      parent_id_field: 'itemParentId',
      parent_display_field: 'itemNumber',
      filter: true,
      actions: {
        //add: true,
        edit: true,
        //delete: true,
        //edit_parent: true,
        resolve_edit: true,
        position: 'right'
      },
      css: { // Optional
        expand_class: 'fa fa-caret-right',
        collapse_class: 'fa fa-caret-down',
        add_class: 'fa fa-plus',
        edit_class: 'fa fa-pencil',
        delete_class: 'fa fa-trash-o fa-lg',
        save_class: 'fa fa-save',
        cancel_class: 'fa fa-times',
        table_class:'table  b-t text-sm'
      },
      columns: [
        {
          name: 'itemNumber',
          header: 'Item',
          editable: true,
          width: '100px'
        },
        {
          name: 'itemGroup',
          header: 'Group',
          width: '100px'
        },
        {
          name: 'itemStoryPoint',
          header: 'SP',
          editable: true,
          width: '50px',
          summary_renderer: (data) => {
          return data.map(rec => rec.itemStoryPoint).reduce((a, b) => a + b, 0);
        }
          //renderer: function(value) { return value + ' years';  }
        },
      {
        name: 'itemSubject',
        header: 'Subject'
      },
      {
        name: 'itemStatus',
        header: 'Status',
        editable: true,
        //renderer: function(value) {return value ? 'Male' : 'Female';  }
      },
      {
        name: 'developerName',
        header: 'Resource',
        editable: true,
        //renderer: function(value) {return value ? 'Male' : 'Female';  }
      },
      {
        name: 'itemType',
        header: 'ItemType',
        editable: true 
      },
      
      {
        name: 'applicationName',
        header: 'Application',
        width: '150px'
      },
      {
        name: 'devItemId',
        header: '',
        renderer: function(value) {return '<i class="fa fa-comments-o fa-lg devitemdailystatus"></i>'},
        width: '20px'
      }
      ],
      row_class_function: function(rec) {
      //console.log(rec);
      let returnCssClass = '';
      if(rec.itemParentId==0){
        if(rec.itemStatus=='Done'){
          returnCssClass='story-done';
        }else if(rec.itemStatus=='Inprogress'){
          returnCssClass='story-inprogress';
        }else{
          returnCssClass='row-custom';
        }
      
      }else{
      if(rec.itemStatus=='Inprogress'){
        returnCssClass='inprogress-subItem';
      }else if(rec.itemStatus=='Done'){
        returnCssClass='done-subItem';
      }else if(rec.itemStatus=='Block'){
        returnCssClass='block-subItem';
      }
      else{
        returnCssClass='subItem';
      }
      
      }
     
      
      return returnCssClass;
    }
    };

    onRowSave($e) {
      const data = $e.data;
     // this.spinner.show();
      //console.log(data);
      
      this.devitemService.updateItem(data.devItemId,data).subscribe(data =>{
        //this.spinner.hide();
      });  
     
      setTimeout(() => {
        $e.resolve();
      }, 1000);
    }

        onRowDelete($e) {
      const data = $e.data;
      
    }

  collapseAll() {
    this.angularGrid.collapseAll();
  }

  expandAll() {
    this.angularGrid.expandAll();
  }

  loadDailyScrumActivity(jiraID: String){
    this.spinner.show();
     this.devitemService.getDevItemAllActivityStatus(jiraID).subscribe(data =>{
        this.devItemActivityObjList = data;
        this.spinner.hide();
      }); 
  }



  onCellClick($e){
  //console.log($e.column.header);
  if($e.column.header==''){
    this.devitemObjActivity.devItemId=$e.row.devItemId;
    this.devitemObjActivity.itemSprintName=$e.row.itemSprintName;
    this.devitemObjActivity.itemNumber=$e.row.itemNumber;
    this.devitemObjActivity.developerName=$e.row.developerName;
    this.devitemObjActivity.itemSubject=$e.row.itemSubject;
    this.loadDailyScrumActivity($e.row.itemNumber);
   
    $("#devdailystatusmodal").modal();
  }
  
  }

  saveTaskActivity(taskActivity){
    this.devitemActivityObj = new Dailyscrumactivity();
    this.devitemActivityObj.sprintName = this.devitemObjActivity.itemSprintName;
    this.devitemActivityObj.devItem = this.devitemObjActivity.itemNumber;
    this.devitemActivityObj.currentStatus = this.ActivityCurrentStatus.value;
    if(this.devitemObjActivity.developerName==null){
      this.devitemActivityObj.resourceName = '';
    }else{
      this.devitemActivityObj.resourceName = this.devitemObjActivity.developerName;
    }
    
    this.saveDevItemStatus();
    this.loadDailyScrumActivity(this.devitemObjActivity.itemNumber);
    this.taskSchedulerActivitySaveForm.reset(); 
  }

  saveDevItemStatus() {
    this.devitemService.saveDavItemCurrentStatus(this.devitemActivityObj)
      .subscribe(data => {
        this.modalCloseJquery();
      });
    this.devitemActivityObj = new Dailyscrumactivity();
  }

  modalCloseJquery(){
    setTimeout(function() { 
          this.$('#taskActivity').modal('hide'); 
          this.$("#itemSubmitButton").prop('disabled', false);
          this.$("#itemSubmitButton").prop('class', 'btn btn-info');
          this.$("#itemSubmitButton").text("Save changes");
        }, 1000);
  }

  actvivityModalClose(){
  this.modalCloseJquery();
  }

  get ActivityCurrentStatus(){
    return this.taskSchedulerActivitySaveForm.get('activity_current_status');
  }


}
