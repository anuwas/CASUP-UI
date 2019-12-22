import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Observable,Subject } from "rxjs";
import { DatePipe } from '@angular/common';


interface IServerResponse {
    items: any[];
    total: number;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})


export class ItemListComponent  implements OnInit{

constructor(private itemservice:ItemService) {

this.config = {
      currentPage: 1,
      itemsPerPage: 50,
      totalItems:3
    };
 }
config: any; 
submitted = false;

item : Item=new Item();
items: Observable<Item[]>;

  

    ngOnInit() {
        this.getPage(1);
        this.submitted=false;
    }

    getPage(page: number) {
    
    this.config.currentPage=page;
        this.itemservice.getItemList(page).subscribe(data =>{
        //console.log(data);
        this.items =data.content;
        this.config.totalItems = data.totalElements;
    })
        
    }

    itemsearchform = new FormGroup({
      search_item_number:new FormControl(),
    });

    itemsaveform=new FormGroup({
    item_id:new FormControl(),
    item_number:new FormControl(),
    item_subject:new FormControl(),
    item_type:new FormControl(),
    item_owner:new FormControl(),
    item_status:new FormControl(),
    item_description:new FormControl(),
    item_created_date:new FormControl(),
    item_close_date:new FormControl(),
    associated_item:new FormControl(),
    application_name:new FormControl(),
    aged_item:new FormControl(),
    priority_item:new FormControl(),
    bounce_item:new FormControl(),
    primary_sla_breahed:new FormControl(),
    secondary_sla_breahed:new FormControl(),
    tertirary_sla_breahed:new FormControl(),
    item_resolution:new FormControl(),
    item_assigned:new FormControl(),
  });

  searchItemSubmit(searchItem){
  console.log("aaa");
      this.itemservice.getItemListByItemNumber(1,this.ItemNumberSearch.value)
            .subscribe(data => {
            this.items =data.content;
            this.config.totalItems = data.totalElements;
            
        });
  }

    saveAndUpdateItem(saveItem){
    this.item=new Item(); 
    this.item.itemNumber=this.ItemNumber.value;
    this.item.itemType=this.ItemType.value;
    this.item.itemStatus=this.ItemStatus.value;
    this.item.itemSubject=this.ItemSubject.value;
    this.item.itemDescription=this.ItemDescription.value;
    this.item.itemOwner=this.ItemOwner.value;
    this.item.itemCreatedDate=this.ItemCreatedDate.value;
    this.item.itemCloseDate=this.ItemCloseDate.value;
    this.item.associatedItem=this.ItemAssociatedItem.value;
    this.item.applicationName=this.ApplicationName.value;
    this.item.priority=this.PriorityItem.value;
    this.item.aged=this.AgedItem.value;
    this.item.bounce=this.BounceItem.value;
    this.item.primarySlaBreached=this.PrimarySlaBreahed.value;
    this.item.secondarySlaBreached=this.SecondarySlaBreahed.value;
    this.item.tertirySlaBreached=this.TertirarySlaBreahed.value;
    this.item.resoluation=this.ItemResolution.value;
    this.item.itemAssigned=this.ItemAssigned.value;
    
    this.submitted = true;
    if(this.ItemId.value==null){
         this.saveItem();
    }else{
        this.item.id=this.ItemId.value;
        this.updateItem();
    }
    this.submitted=false;
    this.itemsaveform.reset();
  }

  saveItem() {
    this.itemservice.createItem(this.item)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
      });
    this.item = new Item();
  }

  updateItem(){
    this.itemservice.updateItem(this.item.id,this.item)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
      });
    this.item = new Item();
  }

    getRemoveItem(itemid){
    if(confirm("Are you sure to delete this Item "+itemid)) {
        console.log("Implement delete functionality here");
        this.itemservice.deleteItem(itemid)
            .subscribe(data => {
            this.getPage(this.config.currentPage);
        });
        }
    
    }

  getUpdateItem(itemid){
    this.item=new Item();
    this.itemservice.getItem(itemid).subscribe(data =>{
         var datePipe=new DatePipe("en-US");
         this.itemsaveform.patchValue({
         item_id:this.UpdatableItem(data,'id'),
         item_number:this.UpdatableItem(data,'itemNumber'),
         item_type:this.UpdatableItem(data,'itemType'),
         item_subject:this.UpdatableItem(data,'itemSubject'),
         item_owner:this.UpdatableItem(data,'itemOwner'),
         item_status:this.UpdatableItem(data,'itemStatus'),
         item_description:this.UpdatableItem(data,'itemDescription'),
         item_created_date:datePipe.transform(this.UpdatableItem(data,'itemCreatedDate'),'yyyy-MM-dd hh:mm:ss'),
         item_close_date:datePipe.transform(this.UpdatableItem(data,'itemCloseDate'),'yyyy-MM-dd hh:mm:ss'),
         associated_item:this.UpdatableItem(data,'associatedItem'),
         application_name:this.UpdatableItem(data,'applicationName'),
         aged_item:this.UpdatableItem(data,'aged'),
         priority_item:this.UpdatableItem(data,'priority'),
         bounce_item:this.UpdatableItem(data,'bounce'),
         primary_sla_breahed:this.UpdatableItem(data,'primarySlaBreached'),
         secondary_sla_breahed:this.UpdatableItem(data,'secondarySlaBreached'),
         tertirary_sla_breahed:this.UpdatableItem(data,'tertirySlaBreached'),
         item_resolution:this.UpdatableItem(data,'resoluation'),
         item_assigned:this.UpdatableItem(data,'itemAssigned')});

    });
    
  }

  addItemModalClose(){
    this.itemsaveform.reset();
  }

  UpdatableItem(updateItemObject:Object,updateItemName:any){
    return updateItemObject[updateItemName];
  }

  get ItemId(){
    return this.itemsaveform.get('item_id');
  }

  get ItemNumber(){
    return this.itemsaveform.get('item_number');
  }

  get ItemNumberSearch(){
    return this.itemsearchform.get('search_item_number');
  }

  get ItemType(){
    return this.itemsaveform.get('item_type');
  }

  get ItemOwner(){
    return this.itemsaveform.get('item_owner');
  }

  get ItemStatus(){
    return this.itemsaveform.get('item_status');
  }

  get ItemDescription(){
    return this.itemsaveform.get('item_description');
  }

  get ItemCreatedDate(){
    return this.itemsaveform.get('item_created_date');
  }

  get ItemCloseDate(){
    return this.itemsaveform.get('item_close_date');
  }

  get ItemSubject(){
    return this.itemsaveform.get('item_subject');
  }

  get ItemAssociatedItem(){
    return this.itemsaveform.get('associated_item');
  }

   get ApplicationName(){
    return this.itemsaveform.get('application_name');
  }

  get AgedItem(){
    return this.itemsaveform.get('aged_item');
  }

  get PriorityItem(){
    return this.itemsaveform.get('priority_item');
  }

  get BounceItem(){
    return this.itemsaveform.get('bounce_item');
  }

  get PrimarySlaBreahed(){
    return this.itemsaveform.get('primary_sla_breahed');
  }

  get SecondarySlaBreahed(){
    return this.itemsaveform.get('secondary_sla_breahed');
  }

  get TertirarySlaBreahed(){
    return this.itemsaveform.get('tertirary_sla_breahed');
  }

  get ItemResolution(){
    return this.itemsaveform.get('item_resolution');
  }

  get ItemAssigned(){
    return this.itemsaveform.get('item_assigned');
  }


}

 



