import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Observable,Subject } from "rxjs";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private itemservice:ItemService) { }

  items: Observable<Item[]>;

  ngOnInit() {
  	this.isupdated=false;
       
    this.itemservice.getItemList().subscribe(data =>{
    this.items =data;
    console.log(data);
    })
  }

}
