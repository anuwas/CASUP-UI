import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { SupItemService } from '../service/supitem.service';
import { Observable,Subject } from "rxjs";
import { Supitem } from '../entity/supitem';
import { Supitemactivity } from '../entity/supitemactivity';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;
@Component({
  selector: 'app-support-active-item',
  templateUrl: './support-active-item.component.html',
  styleUrls: ['./support-active-item.component.css']
})
export class SupportActiveItemComponent implements OnInit {

  constructor(private supitemservice: SupItemService,private spinner: NgxSpinnerService) { }

  itemData: Observable<any>;
  itemReportData: Observable<any>;
  itemProblemRecordData: Observable<any>;
  supitem : Supitem=new Supitem();
  supitemactivity : Supitemactivity=new Supitemactivity();
  supitemactivityList: Observable<Supitemactivity[]>;
  currentAPO : any;

  ngOnInit() {
  	this.getPage();
    this.getReportPage();
    this.getActiveProblemRecordPage();
  }

  supitemactivityform=new FormGroup({
    sup_item_id:new FormControl(),
    sup_item_activity:new FormControl('',[Validators.required ]),
  });

  settings = {
  rowClassFunction: (row) => {
          if (row.cells[2].newValue === 'Active') {
              return 'active_item';
          }
        },
 
  actions: {
      custom: [
                { name: 'viewrecord', title: '<i class="fa fa-comments-o fa-lg active_item_activity_btn" title="Add Activity"></i>'}
              ],
      position: 'right',
    },
    pager:{
      perPage:20
    },

    delete: {
      confirmDelete: true,

      deleteButtonContent: '<i class="fa fa-trash-o " title="Delete Item"></i>',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },

    add: {
      confirmCreate: true,
      createButtonContent:'Save'
    },
    edit: {
      confirmSave: true,
      editButtonContent:'<i class="fa fa-edit fa-lg edit-item-button" title="Edit Item"></i>'
    },
    columns: {
      
      itemNumber: {
        title: 'Item Number',
        width: '12%',
      },
      itemType: {
        title: 'Type',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Incident', title: 'Incident' },
                        { value: 'Service Request', title: 'Service Request' },
                        { value: 'Problem Record', title: 'Problem Record' },
                        { value: 'Change Request', title: 'Change Request' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                         { value: 'Incident', title: 'Incident' },
                        { value: 'Service Request', title: 'Service Request' },
                        { value: 'Problem Record', title: 'Problem Record' },
                        { value: 'Change Request', title: 'Change Request' },
                  ]
                }
        },
        width: '12%',
      },
      itemStatus: {
        title: 'Status',
        width: '15%',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Active', title: 'Active' },
                        { value: 'Waiting for Customer', title: 'Waiting for Customer' },
                        { value: 'Premises On Hold', title: 'Premises On Hold' },
                        { value: 'Waiting for RFC', title: 'Waiting for RFC' },
                        { value: 'Re-Opened', title: 'Re-Opened' },
                        { value: 'Closed', title: 'Closed' },
                        { value: 'Resolved', title: 'Resolved' },
                        { value: 'Fulfilled', title: 'Fulfilled' },
                        { value: 'Cancel', title: 'Cancel' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Active', title: 'Active' },
                        { value: 'Waiting for Customer', title: 'Waiting for Customer' },
                        { value: 'Premises On Hold', title: 'Premises On Hold' },
                        { value: 'Waiting for RFC', title: 'Waiting for RFC' },
                        { value: 'Re-Opened', title: 'Re-Opened' },
                  ]
                }
        }
      },
      itemSubject: {
        title: 'Subject',
      },
      itemAssigned: {
        title: 'Assigned',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Abhiroop Chakraborty', title: 'Abhiroop Chakraborty' },
                        { value: 'Alamgir Ali SK', title: 'Alamgir Ali SK' },
                        { value: 'Tuhin Ghosh', title: 'Tuhin Ghosh' },
                        { value: 'Pralaysankar Saha', title: 'Pralaysankar Saha' },
                        { value: 'Vivek Sen', title: 'Vivek Sen' },
                        { value: 'Rajarshi Mandal', title: 'Rajarshi Mandal' },
                        { value: 'Abir Bhowmick', title: 'Abir Bhowmick' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Abhiroop', title: 'Abhiroop Chakraborty' },
                        { value: 'Alamgir', title: 'Alamgir Ali SK' },
                        { value: 'Tuhin', title: 'Tuhin Ghosh' },
                        { value: 'Pralaysankar', title: 'Pralaysankar Saha' },
                        { value: 'Vivek', title: 'Vivek Sen' },
                        { value: 'Rajarshi Mandal', title: 'Rajarshi Mandal' },
                        { value: 'Abir Bhowmick', title: 'Abir Bhowmick' },
                  ]
                }
        }
      },
      applicationName: {
        title: 'Application',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'STS', title: 'STS' },
                        { value: 'RVS', title: 'RVS' },
                        { value: 'BULATS', title: 'BULATS' },
                        { value: 'CIE Direct', title: 'CIE Direct' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'STS', title: 'STS' },
                        { value: 'RVS', title: 'RVS' },
                        { value: 'BULATS', title: 'BULATS' },
                        { value: 'CIE Direct', title: 'CIE Direct' },
                  ]
                }
        },
      },      
    },
    defaultStyle: false,
    attr: {
        class: 'table table-striped b-t text-sm2'
      }
       

  };


  getPage(){
  this.spinner.show();
  this.supitemservice.getActiveItemList().subscribe(data =>{
        this.itemData =data;
        this.spinner.hide();
    })
  }
  getReportPage(){
  this.spinner.show();
  this.supitemservice.getActiveReportItemList().subscribe(data =>{
        this.itemReportData =data;
        this.spinner.hide();
    })
  }
  getActiveProblemRecordPage(){
  this.spinner.show();
  this.supitemservice.getActiveProblemRecordItemList().subscribe(data =>{
        this.itemProblemRecordData =data;
        this.spinner.hide();
    })
  }
  
data = [ ];

    onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
    	this.supitemservice.deleteItem(event.data.id)
            .subscribe(data => {
            this.getPage();
            this.getReportPage();
        });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event.newData);
    this.supitem=new Supitem(); 
    this.supitem.itemNumber=event.newData.itemNumber;
    this.supitem.itemType=event.newData.itemType;
    this.supitem.itemStatus=event.newData.itemStatus;
    this.supitem.itemAssigned=event.newData.itemAssigned;
    this.supitem.applicationName=event.newData.applicationName;
    this.supitemservice.createItem(this.supitem)
      .subscribe(data => {
        this.getPage();
        this.getReportPage();
      });
    this.supitem = new Supitem();
    event.confirm.reject();
  }

  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    console.log(event);
    this.supitem = event.newData;
    this.supitemservice.updateItem(this.supitem.id,this.supitem)
      .subscribe(data => {
        this.getPage();
        this.getReportPage();
      });
    this.supitem = new Supitem();
  }

  onCustomAction(event) {
      switch ( event.action) {
        case 'viewrecord':
          this.viewRecord(event.data);
          break;
      }
    }

    viewRecord(activityData:any){
    $('#modal').modal({ backdrop: 'static', keyboard: false})
    $("#modal").modal('show');
    this.supitem = activityData;
    this.loadItemActivityItem();
    this.supitemactivityform.patchValue({
         sup_item_id:this.UpdatableItemActivity(activityData,'id')});
    }

    loadItemActivityItem(){    
    this.supitemservice.getItemActivityListByItemNumber(this.supitem.id)
      .subscribe(data => {
        this.supitemactivityList = data;
        this.currentAPO=this.supitem.itemAssigned;
      });
      
    }

    

  saveAndUpdateSupItemActivity(supItemActivity){
  if (this.supitemactivityform.invalid) { return; }

  this.spinner.show();
  this.supitemactivity=new Supitemactivity();
  this.supitemactivity.itemId=this.SupItemId.value;
  this.supitemactivity.itemActivity=this.SupItemActivity.value;
  this.supitemservice.saveSupItemActivity(this.supitemactivity)
      .subscribe(data => {
        this.loadItemActivityItem();
        this.spinner.hide();
      });
    this.supitemactivityform.reset();  
    this.supitemactivity = new Supitemactivity();
  };



UpdatableItemActivity(updateItemObject:Object,updateItemName:any){
    return updateItemObject[updateItemName];
  }

   get SupItemId(){
    return this.supitemactivityform.get('sup_item_id');
  }

  get SupItemActivity(){
    return this.supitemactivityform.get('sup_item_activity');
  }

  actvivityModalClose(){
    this.supitemactivityform.reset();
  }

problemRecordSettings = {
  rowClassFunction: (row) => {

          if (row.cells[2].newValue === 'Pending') {
              return 'active_item';
          }else if (row.cells[2].newValue === 'Shared') {
              return 'shared_rca';
          }else if (row.cells[2].newValue === 'Review') {
              return 'review_rca';
          }else if (row.cells[2].newValue === 'Completed') {
              return 'completed_rca';
          }else if (row.cells[2].newValue === 'Inprogress') {
              return 'inprogress_rca';
          }
        },
 
  actions: {
      custom: [
                { name: 'viewrecord', title: '<i class="fa fa-comments-o fa-lg active_item_activity_btn" title="Add Activity"></i>'}
              ],
      position: 'right',
    },
    pager:{
      perPage:20
    },

    delete: {
      confirmDelete: true,

      deleteButtonContent: '<i class="fa fa-trash-o " title="Delete Item"></i>',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },

    add: {
      confirmCreate: true,
      createButtonContent:'Save'
    },
    edit: {
      confirmSave: true,
      editButtonContent:'<i class="fa fa-edit fa-lg edit-item-button" title="Edit Item"></i>'
    },
    columns: {
      
      itemNumber: {
        title: 'Item Number',
        width: '12%',
      },
      itemStatus: {
        title: 'Status',
        width: '15%',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Awaiting Review', title: 'Awaiting Review' },
                        { value: 'Investivation', title: 'Investivation' },
                        { value: 'Planned into Release', title: 'Planned into Release' },
                        { value: 'Identified', title: 'Identified' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Awaiting Review', title: 'Awaiting Review' },
                        { value: 'Investivation', title: 'Investivation' },
                        { value: 'Planned into Release', title: 'Planned into Release' },
                        { value: 'Identified', title: 'Identified' },
                  ]
                }
        }
      },
      rcaDocument: {
        title: 'RCA',
        width: '15%',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Pending', title: 'Pending' },
                        { value: 'Inprogress', title: 'Inprogress' },
                        { value: 'Review', title: 'Review' },
                        { value: 'Completed', title: 'Completed' },
                        { value: 'Shared', title: 'Shared' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Pending', title: 'Pending' },
                        { value: 'Inprogress', title: 'Inprogress' },
                        { value: 'Review', title: 'Review' },
                        { value: 'Completed', title: 'Completed' },
                        { value: 'Shared', title: 'Shared' },
                  ]
                }
        }
      },
      itemSubject: {
        title: 'Subject',
      },
      itemAssigned: {
        title: 'Assigned',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Abhiroop Chakraborty', title: 'Abhiroop Chakraborty' },
                        { value: 'Alamgir Ali SK', title: 'Alamgir Ali SK' },
                        { value: 'Tuhin Ghosh', title: 'Tuhin Ghosh' },
                        { value: 'Pralaysankar Saha', title: 'Pralaysankar Saha' },
                        { value: 'Vivek Sen', title: 'Vivek Sen' },
                        { value: 'Rajarshi Mandal', title: 'Rajarshi Mandal' },
                        { value: 'Abir Bhowmick', title: 'Abir Bhowmick' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Abhiroop', title: 'Abhiroop Chakraborty' },
                        { value: 'Alamgir', title: 'Alamgir Ali SK' },
                        { value: 'Tuhin', title: 'Tuhin Ghosh' },
                        { value: 'Pralaysankar', title: 'Pralaysankar Saha' },
                        { value: 'Vivek', title: 'Vivek Sen' },
                        { value: 'Rajarshi Mandal', title: 'Rajarshi Mandal' },
                        { value: 'Abir Bhowmick', title: 'Abir Bhowmick' },
                  ]
                }
        }
      },
      applicationName: {
        title: 'Application',
        editor: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'STS', title: 'STS' },
                        { value: 'RVS', title: 'RVS' },
                        { value: 'BULATS', title: 'BULATS' },
                        { value: 'CIE Direct', title: 'CIE Direct' },
                  ]
                }
        },
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'STS', title: 'STS' },
                        { value: 'RVS', title: 'RVS' },
                        { value: 'BULATS', title: 'BULATS' },
                        { value: 'CIE Direct', title: 'CIE Direct' },
                  ]
                }
        },
      },      
    },
    defaultStyle: false,
    attr: {
        class: 'table table-striped b-t text-sm2'
      }
       

  };
}

  