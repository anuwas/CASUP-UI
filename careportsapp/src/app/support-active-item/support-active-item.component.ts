import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ItemService } from '../service/item.service';
import { Observable,Subject } from "rxjs";
import { Supitem } from '../entity/supitem';
import { Supitemactivity } from '../entity/supitemactivity';

declare var $: any;
@Component({
  selector: 'app-support-active-item',
  templateUrl: './support-active-item.component.html',
  styleUrls: ['./support-active-item.component.css']
})
export class SupportActiveItemComponent implements OnInit {

  constructor(private itemservice:ItemService) { }

  itemData: Observable<any>;
  item : Supitem=new Supitem();
  supitemactivity : Supitemactivity=new Supitemactivity();
  supitemactivityList: Observable<Supitemactivity[]>;
  currentAPO : any;

  ngOnInit() {
  	this.getPage();
  }

  supitemactivityform=new FormGroup({
    sup_item_id:new FormControl(),
    sup_item_activity:new FormControl(),
  });

  settings = {
 
  actions: {
      custom: [
                { name: 'viewrecord', title: '<i class="fa fa-eye active_item_activity_btn" title="Add Activity"></i>'}
              ],
      position: 'right',
    },
    pager:{
      perPage:20
    },

    delete: {
      confirmDelete: true,

      deleteButtonContent: '<i class="fa fa-trash-o fa-lg" title="Delete Item"></i>',
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
        title: 'Item Type',
        width: '15%',
      },
      itemStatus: {
        title: 'Item Status',
      },
      itemSubject: {
        title: 'Subject',
      },
      itemAssigned: {
        title: 'Assigned',
        filter: {
        type: 'list',
        config: {
                  selectText: 'Show All',
                  list: [
                        { value: 'Abhiroop', title: 'Abhiroop Chakraborty' },
                        { value: 'Alamgir', title: 'Alamgir Ali SK' },
                        { value: 'Tuhin', title: 'Tuhin Ghosh' },
                        { value: 'Pralaysankar', title: 'Pralaysankar Saha' },
                  ]
                }
        }
      },
      applicationName: {
        title: 'Application',
      },      
    },
    defaultStyle: false,
    attr: {
        class: 'table table-striped b-t text-sm2'
      }
       

  };

  getPage(){
  this.itemservice.getActiveItemList().subscribe(data =>{
        //console.log(data);
        this.itemData =data;
    })
  }
  
data = [ ];

    onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
    	this.itemservice.deleteItem(event.data.id)
            .subscribe(data => {
            this.getPage();
        });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event.newData);
    this.item=new Supitem(); 
    this.item.itemNumber=event.newData.itemNumber;
    this.item.itemType=event.newData.itemType;
    this.item.itemStatus=event.newData.itemStatus;
    this.item.itemAssigned=event.newData.itemAssigned;
    this.item.applicationName=event.newData.applicationName;
    this.itemservice.createItem(this.item)
      .subscribe(data => {
        this.getPage();
      });
    this.item = new Supitem();
    event.confirm.reject();
  }

  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    console.log(event);
    this.item = event.newData;
    this.itemservice.updateItem(this.item.id,this.item)
      .subscribe(data => {
        this.getPage();
      });
    this.item = new Supitem();
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
    this.itemservice.getItemActivityListByItemNumber(activityData.id)
      .subscribe(data => {
        this.supitemactivityList = data;
        this.currentAPO=activityData.itemAssigned;
      });
    this.supitemactivityform.patchValue({
         sup_item_id:this.UpdatableItemActivity(activityData,'id')});
    
    }

    

  saveAndUpdateSupItemActivity(supItemActivity){
  this.supitemactivity=new Supitemactivity();
  this.supitemactivity.itemId=this.SupItemId.value;
  this.supitemactivity.itemActivity=this.SupItemActivity.value;
  this.itemservice.saveSupItemActivity(this.supitemactivity)
      .subscribe(data => {
        console.log(data);
      });
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
}
