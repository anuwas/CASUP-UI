import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Observable,Subject } from "rxjs";
import { Item } from '../item';


@Component({
  selector: 'app-support-active-item',
  templateUrl: './support-active-item.component.html',
  styleUrls: ['./support-active-item.component.css']
})
export class SupportActiveItemComponent implements OnInit {

  constructor(private itemservice:ItemService) { }

  itemData: Observable<any>;
  item : Item=new Item();

  ngOnInit() {
  	this.getPage();
  }

  settings = {
 
  actions: {
     
      position: 'right'
    },
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Delete',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },

    add: {
      confirmCreate: true,
      createButtonContent:'Save'
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      
      itemNumber: {
        title: 'Item Number',
        width: '12%',
      },
      itemType: {
        title: 'Item Type',
      },
      itemStatus: {
        title: 'Item Status',
      },
      itemAssigned: {
        title: 'Assigned',
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
    this.item=new Item(); 
    this.item.itemNumber=event.newData.itemNumber;
    this.item.itemType=event.newData.itemType;
    this.item.itemStatus=event.newData.itemStatus;
    this.item.itemAssigned=event.newData.itemAssigned;
    this.item.applicationName=event.newData.applicationName;
    this.itemservice.createItem(this.item)
      .subscribe(data => {
        this.getPage();
      });
    this.item = new Item();
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
    this.item = new Item();
  }

}
