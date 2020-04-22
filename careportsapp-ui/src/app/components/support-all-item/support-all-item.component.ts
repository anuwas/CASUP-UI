import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { SupItemService } from '../../service/supitem.service';
import { ExcelService } from '../../service/excel.service';
import { Supitem } from '../../entity/supitem';
import { SupitemAdvSearch } from '../../dto/supitemadvsearch';
import { Observable,Subject } from "rxjs";
import { DatePipe } from '@angular/common';
import { parse } from 'date-fns';
import { NgxSpinnerService } from "ngx-spinner";
import{ GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-support-all-item',
  templateUrl: './support-all-item.component.html',
  styleUrls: ['./support-all-item.component.css']
})
export class SupportAllItemComponent implements OnInit {

  constructor(private supitemservice: SupItemService,private spinner: NgxSpinnerService,private excelService:ExcelService) {

this.config = {
      currentPage: 1,
      itemsPerPage: 50,
      totalItems:3
    };
 }
public date: any;

config: any; 
submitted = false;
advanceSearchToggleBtnclickEventstats: boolean = false;
stringifyadvsrcstr : any;

item : Supitem=new Supitem();
items: Observable<Supitem[]>;
supitemadvsearchattribute : SupitemAdvSearch=new SupitemAdvSearch();
excelData : any=[] ;
allSupUsers : any=[];
allApplicatoinName : any=[];

  ngOnInit() {
  	this.getPage(1);
    this.submitted=false;
    this.loadPageConfiguration();
  }

  loadPageConfiguration(){
    this.allSupUsers=GlobalConstants.getAllSupUsers();
    this.allApplicatoinName=GlobalConstants.getAllApplicationNames();
  }


    getPage(page: number) {
    this.spinner.show();
    this.config.currentPage=page;
    /*
        this.supitemservice.getItemList(this.supitemadvsearchattribute,page).subscribe(data =>{
        this.items = data.content;
        this.config.totalItems = data.totalElements;
        this.spinner.hide();
    });
    */

    this.supitemservice.getAllSupItemListSrc(this.supitemadvsearchattribute,page).subscribe(data =>{
        this.items = this.getSupItemDataContent(data,'content');
        this.config.totalItems = this.getSupItemDataContent(data,'totalElements');
        this.spinner.hide();
    });
    
    }

    getSupItemDataContent(responseData:Object,contentName:any){
    return responseData[contentName];
  }

    itemsaveform=new FormGroup({
    item_id:new FormControl('',[Validators.required]),
    item_number:new FormControl(),
    item_subject:new FormControl(),
    item_type:new FormControl('Incident'),
    item_owner:new FormControl(),
    item_status:new FormControl(''),
    item_description:new FormControl(),
    item_created_date:new FormControl(),
    item_close_date:new FormControl(),
    associated_item:new FormControl(),
    application_name:new FormControl(''),
    aged_item:new FormControl('N'),
    priority_item:new FormControl(5),
    bounce_item:new FormControl(),
    primary_sla_breahed:new FormControl('N'),
    secondary_sla_breahed:new FormControl('N'),
    tertirary_sla_breahed:new FormControl('N'),
    item_resolution:new FormControl(),
    item_assigned:new FormControl(''),
    aged_justification:new FormControl(''),
    breach_justification:new FormControl(''),
    debt_class:new FormControl(),
    debt_type:new FormControl(),
    remedial_mechanism:new FormControl(),
    revised_tower:new FormControl(),
    debt_comment:new FormControl(),
  });

  itemsearchform = new FormGroup({
      search_item_number:new FormControl(null),
      adv_search_from_date:new FormControl(),
      adv_search_to_date:new FormControl(),
      adv_search_opne_date:new FormControl(false),
      adv_search_close_date:new FormControl(false),
      adv_search_application_name:new FormControl('All'),
      adv_search_bounce:new FormControl(null),
      adv_search_item_status:new FormControl('All'),
      adv_search_item_type:new FormControl('All'),
      adv_search_assigned:new FormControl('All'),
      adv_search_sla:new FormControl('All'),
      adv_search_debt:new FormControl('All'),
      adv_search_priority:new FormControl('-1'),
      search_text:new FormControl(),
    });

    



    searchItemSubmit(searchItem){
    this.spinner.show();
      this.supitemadvsearchattribute = new SupitemAdvSearch();
      if(this.ItemNumberSearch.value==''){
        this.supitemadvsearchattribute.itemNumber = 0;
      }else{
      this.supitemadvsearchattribute.itemNumber = this.ItemNumberSearch.value;
      }
      
      this.supitemadvsearchattribute.itemFromDate = this.AdvSrcFromDate.value;
      
      this.supitemadvsearchattribute.itemToDate = this.setLastTimeOfDay(this.AdvSrcToDate.value);
      this.supitemadvsearchattribute.opneDate = this.AdvSrcOpenDate.value;
      this.supitemadvsearchattribute.closeDate = this.AdvSrcCloseDate.value;
      this.supitemadvsearchattribute.applicationName= this.AdvSrcApplicationName.value;
      this.supitemadvsearchattribute.bounce = this.AdvSrcBounce.value;
      this.supitemadvsearchattribute.itemStatus = this.AdvSrcItemStatus.value;
      this.supitemadvsearchattribute.itemType = this.AdvSrcItemType.value;
      this.supitemadvsearchattribute.itemAssigned = this.AdvSrcItemAssigned.value;
      this.supitemadvsearchattribute.sla = this.AdvSrcItemSla.value;
      this.supitemadvsearchattribute.debt= this.AdvSrcItemDebt.value;
      this.supitemadvsearchattribute.priority=this.AdvSrcItemPriority.value;
      this.supitemadvsearchattribute.searchText=this.AdvSrcSearchText.value;
      //this.stringifyadvsrcstr=JSON.stringify(this.supitemadvsearchattribute);
      this.getPage(1);
  }

    saveAndUpdateItem(saveItem){
    this.item=new Supitem(); 
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
    this.item.agedJustification=this.AgedJustification.value;
    this.item.breachJustification=this.BreachJustification.value;
    this.item.debtClass=this.DebtClass.value;
    this.item.debtType=this.DebtType.value;
    this.item.debtRemedialMechanism=this.DebtRemedialMechanism.value;
    this.item.revisedTower=this.DevisedTower.value;
    this.item.debtComment=this.DebtComment.value;
    
    
    this.submitted = true;
    if(this.ItemId.value==null || this.ItemId.value==''){
         this.saveItem();
         this.itemsaveform.reset();
    }else{
        this.item.id=this.ItemId.value;
        this.updateItem();
        this.itemsaveform.reset();
    }
    this.submitted=false;
    this.ItemSaveFormResetDropDownValues();
  }

    saveItem() {
    this.supitemservice.createItem(this.item)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.item = new Supitem();
  }

  modalCloseJquery(){
  setTimeout(function() { 
          this.$('#modal').modal('hide');           
          this.$("#itemSubmitButtonAddEdit").prop('disabled', false);
          this.$("#itemSubmitButtonAddEdit").prop('class', 'btn btn-info');
          this.$("#itemSubmitButtonAddEdit").text("Save changes");

          this.$('#operationmodal').modal('hide'); 
          this.$("#itemSubmitButtonReport").prop('disabled', false);
          this.$("#itemSubmitButtonReport").prop('class', 'btn btn-info');
          this.$("#itemSubmitButtonReport").text("Save changes");

          
        }, 1000);
  }

    updateItem(){
    this.supitemservice.updateItem(this.item.id,this.item)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.item = new Supitem();
  }

     getRemoveItem(itemid){
    	if(confirm("Are you sure to delete this Item "+itemid)) {
        console.log("Implement delete functionality here");
        this.supitemservice.deleteItem(itemid)
            .subscribe(data => {
            this.getPage(this.config.currentPage);
        });
        }
    }

    getUpdateItem(itemid){
    	this.item=new Supitem();
    	this.supitemservice.getItem(itemid).subscribe(data =>{
         var datePipe=new DatePipe("en-US");
         this.itemsaveform.patchValue({
         item_id:this.UpdatableItem(data,'id'),
         item_number:this.UpdatableItem(data,'itemNumber'),
         item_type:this.UpdatableItem(data,'itemType'),
         item_subject:this.UpdatableItem(data,'itemSubject'),
         item_owner:this.UpdatableItem(data,'itemOwner'),
         item_status:this.UpdatableItem(data,'itemStatus'),
         item_description:this.UpdatableItem(data,'itemDescription'),
         //item_created_date:datePipe.transform(this.UpdatableItem(data,'itemCreatedDate'),'yyyy-MM-dd hh:mm'),
        item_created_date:new Date(this.UpdatableItem(data,'itemCreatedDate')),
        // item_close_date:datePipe.transform(this.UpdatableItem(data,'itemCloseDate'),'yyyy-MM-dd hh:mm'),
        item_close_date:new Date(this.UpdatableItem(data,'itemCloseDate')),
         associated_item:this.UpdatableItem(data,'associatedItem'),
         application_name:this.UpdatableItem(data,'applicationName'),
         aged_item:this.UpdatableItem(data,'aged'),
         priority_item:this.UpdatableItem(data,'priority'),
         bounce_item:this.UpdatableItem(data,'bounce'),
         primary_sla_breahed:this.UpdatableItem(data,'primarySlaBreached'),
         secondary_sla_breahed:this.UpdatableItem(data,'secondarySlaBreached'),
         tertirary_sla_breahed:this.UpdatableItem(data,'tertirySlaBreached'),
         item_resolution:this.UpdatableItem(data,'resoluation'),
         aged_justification:this.UpdatableItem(data,'agedJustification'),
         breach_justification:this.UpdatableItem(data,'breachJustification'),
         debt_class:this.UpdatableItem(data,'debtClass'),
         debt_type:this.UpdatableItem(data,'debtType'),
         remedial_mechanism:this.UpdatableItem(data,'debtRemedialMechanism'),
         revised_tower:this.UpdatableItem(data,'revisedTower'),
         debt_comment:this.UpdatableItem(data,'debtComment'),
         item_assigned:this.UpdatableItem(data,'itemAssigned')});
    });
  }

  addItemModalOpen(){
  this.ItemSaveFormResetDropDownValues();
  }

  ItemSaveFormResetDropDownValues(){
    this.itemsaveform.patchValue({
      item_type:'Incident',
      item_status:'',
      item_assigned:'',
      application_name:'',
      priority_item:'5',
      });
  }


exportExcelOnClickBtn():void {
this.supitemservice.getAllSupItemListSrcForExcelExport(this.supitemadvsearchattribute,'MSR')
      .subscribe(data => {
        this.excelData = this.excelService.excelFormatDatatoExport(data,'MSR');
        //console.log(this.excelData);
        this.excelService.exportAsExcelFile(this.excelData, 'SupportExtract');
      });
      
     /*
this.excelData = [{
eid: 'e101',
ename: 'ravi',
esal: 1000
},{
eid: 'e102',
ename: 'ram',
esal: 2000
},{
eid: 'e103',
ename: 'rajesh',
esal: 3000
}];
*/
//
   
}

getOperationColorClass(itemObject : Object){
  let operationClass = '';
  if(itemObject['itemType']=='Incident'){
    if(itemObject['itemStatus']=='Closed' || itemObject['itemStatus']=='Resolved'){
      if(itemObject['debtClass']==null || itemObject['debtType']==null || itemObject['debtRemedialMechanism']==null){
        operationClass = 'debtEmpty';
      }

      if(itemObject['resoluation']=='' || itemObject['resoluation'] == null){
        operationClass = 'resolutionEmpty';
      }

      if(itemObject['itemSubject']==null || itemObject['itemSubject']=='' || itemObject['itemDescription'] == null || itemObject['itemDescription'] == ''){
        operationClass = 'subjectDescriptionEmpty';
      }

    }
  }
  return operationClass;
}
  
  advanceSearchToggleBtnclickEvent(){
    this.advanceSearchToggleBtnclickEventstats = !this.advanceSearchToggleBtnclickEventstats; 
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

  get AgedJustification(){
    return this.itemsaveform.get('aged_justification');
  }

  get BreachJustification(){
    return this.itemsaveform.get('breach_justification');
  }

  get DebtClass(){
    return this.itemsaveform.get('debt_class');
  }

  get DebtType(){
    return this.itemsaveform.get('debt_type');
  }

  get DebtRemedialMechanism(){
    return this.itemsaveform.get('remedial_mechanism');
  }

  get DevisedTower(){
    return this.itemsaveform.get('revised_tower');
  }

  get DebtComment(){
    return this.itemsaveform.get('debt_comment');
  }

  


  // advance search items

  get ItemNumberSearch(){
    return this.itemsearchform.get('search_item_number');
  }

  get AdvSrcFromDate(){
    return this.itemsearchform.get('adv_search_from_date');
  }
  get AdvSrcToDate(){
    return this.itemsearchform.get('adv_search_to_date');
  }
  get AdvSrcOpenDate(){
    return this.itemsearchform.get('adv_search_opne_date');
  }
  get AdvSrcCloseDate(){
    return this.itemsearchform.get('adv_search_close_date');
  }
  get AdvSrcApplicationName(){
    return this.itemsearchform.get('adv_search_application_name');
  }
  get AdvSrcBounce(){
    return this.itemsearchform.get('adv_search_bounce');
  }
  get AdvSrcItemStatus(){
    return this.itemsearchform.get('adv_search_item_status');
  }
   get AdvSrcItemType(){
    return this.itemsearchform.get('adv_search_item_type');
  }
  get AdvSrcItemAssigned(){
    return this.itemsearchform.get('adv_search_assigned');
  }
  get AdvSrcItemSla(){
    return this.itemsearchform.get('adv_search_sla');
  }
  get AdvSrcItemDebt(){
    return this.itemsearchform.get('adv_search_debt');
  }
  get AdvSrcItemPriority(){
    return this.itemsearchform.get('adv_search_priority');
  }
  get AdvSrcSearchText(){
    return this.itemsearchform.get('search_text');
  }

   setLastTimeOfDay(dateObj){
    var dateObjTemp = new Date(dateObj);
    dateObjTemp.setHours(dateObjTemp.getHours() + 23);
    dateObjTemp.setMinutes(dateObjTemp.getMinutes() + 59);
    dateObjTemp.setSeconds(dateObjTemp.getSeconds() + 59);
    return dateObjTemp;
  }

}
