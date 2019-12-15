import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Observable,Subject } from "rxjs";


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
      itemsPerPage: 20,
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
        this.loading = true;
        this.itemservice.getItemList(page).subscribe(data =>{
        //console.log(data);
        this.items =data.content;
        this.config.totalItems = data.totalElements;
    })
        
    }

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
  });

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
    
    this.submitted = true;
    if(this.ItemType.value==''){
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
        console.log(data);
      });
    this.item = new Item();
  }

  updateItem(){
    this.itemservice.updateItem(this.item.id,this.item)
      .subscribe(data => {
        console.log(data);
      });
    this.item = new Item();
  }

    getRemoveItem(itemid){
    if(confirm("Are you sure to delete this Item "+itemid)) {
        console.log("Implement delete functionality here");
        this.itemservice.deleteItem(itemid)
            .subscribe(data => {
            console.log(data);
        });
        window.location.reload();
        }
    
    }

  getUpdateItem(itemid){
    this.item=new Item();
    this.itemservice.getItem(itemid).subscribe(data =>{
         this.itemsaveform.setValue({item_id:data.id,item_number:data.itemNumber,item_type:data.itemType,item_subject:data.itemSubject,item_owner:data.itemOwner,item_status:data.itemStatus,item_description:data.itemDescription,item_created_date:data.itemCreatedDate,item_close_date:data.itemCloseDate,associated_item:data.associatedItem});

    });
    
  }

  addItemModalClose(){
    this.itemsaveform.reset();
  }

  get ItemId(){
    return this.itemsaveform.get('item_id');
  }

  get ItemNumber(){
    return this.itemsaveform.get('item_number');
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



}

 



