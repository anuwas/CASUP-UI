import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { DevItemService } from '../../service/devitem.service';
import { AngularTreeGridComponent } from 'angular-tree-grid';
import { NgxSpinnerService } from "ngx-spinner";
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-current-sprint',
  templateUrl: './current-sprint.component.html',
  styleUrls: ['./current-sprint.component.css']
})
export class CurrentSprintComponent implements OnInit {

@ViewChild('angularGrid', { static: false }) angularGrid: AngularTreeGridComponent;
devitemObjList: any = [];

  constructor(private devitemService: DevItemService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  	this.getPage(GlobalConstants.currentSprint);
  }

   getPage(currentSprint: string) {
      this.spinner.show();
      this.devitemService.getDevCurrentSprintItemList(currentSprint).subscribe(data =>{
        this.devitemObjList = data;
        this.spinner.hide();
      });  
    }


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
        table_class:'table table-striped b-t text-sm'
      },
      columns: [
        {
          name: 'itemNumber',
          header: 'Item',
          editable: true,
          width: '100px'
        },
        {
          name: 'itemStoryPoint',
          header: 'SP',
          editable: true,
          width: '50px'
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
      }
      ],
      row_class_function: function(rec) {
      console.log(rec);
      return 'row-custom';
    }
    };

    onRowSave($e) {
      const data = $e.data;
      this.spinner.show();
      this.devitemService.updateItem(data.devItemId,data).subscribe(data =>{
        this.spinner.hide();
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

}
