import { Component, OnInit } from '@angular/core';
import { DevItemService } from '../service/devitem.service';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Devitem } from '../entity/devitem';
import { Devitemrequest } from '../entity/devitemrequest';
import { Observable,Subject } from "rxjs";


@Component({
  selector: 'app-dev-all-item',
  templateUrl: './dev-all-item.component.html',
  styleUrls: ['./dev-all-item.component.css']
})
export class DevAllItemComponent implements OnInit {

  constructor(private devitemService: DevItemService,private spinner: NgxSpinnerService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 50,
      totalItems:3
    };
   }

devitemRequestAttributes : Devitemrequest=new Devitemrequest();
devitemObj : Devitem =new Devitem();
devitemObjList: Observable<Devitem[]>;
config: any; 
advanceSearchToggleBtnclickEventstats: boolean = false;
submitted = false;
public date: any;

  ngOnInit() {
    this.getPage(1);
  }



    getPage(page: number) {
      this.spinner.show();
      this.config.currentPage=page;
      console.log(this.devitemRequestAttributes);
      this.devitemService.getAllDevItemByRequest(this.devitemRequestAttributes,page).subscribe(data =>{
        this.devitemObjList = this.getDevItemDataContent(data,'content');
        this.config.totalItems = this.getDevItemDataContent(data,'totalElements');
        this.spinner.hide();
      });  
    }

      devitemsearchform = new FormGroup({
      search_item_number:new FormControl(),
      adv_search_from_date:new FormControl(),
      adv_search_to_date:new FormControl(),
      adv_search_opne_date:new FormControl(false),
      adv_search_close_date:new FormControl(false),
      adv_search_application_name:new FormControl('All'),
      adv_search_item_status:new FormControl('All'),
      adv_search_item_type:new FormControl('All'),
      adv_search_assigned:new FormControl('All'),
      adv_search_sprint_name:new FormControl('All'),
      adv_search_project:new FormControl('All'),
      adv_search_priority:new FormControl('All'),
      adv_search_is_refined:new FormControl(),
      adv_search_chk_task:new FormControl(),
      adv_search_chk_sub_task:new FormControl(),
    });

    itemsaveform=new FormGroup({
    dev_item_id:new FormControl('',[Validators.required]),
    item_number:new FormControl(),
    item_story_point:new FormControl(),
    parent_item_number:new FormControl(),
    item_subject:new FormControl(),
    item_type:new FormControl('Story'),
    item_status:new FormControl(''),
    item_description:new FormControl(),
    application_name:new FormControl(''),
    priority_item:new FormControl(),
    sprint_name:new FormControl(),
    developer_name:new FormControl(),
    tester_name:new FormControl(),
    acceptance_criteria:new FormControl(),
    item_assigned:new FormControl(''),
    project_name:new FormControl(''),
  });

  saveAndUpdateDevItem(saveItem){
    this.devitemObj = new Devitem();
    this.devitemObj.itemNumber=this.ItemNumber.value;
    this.devitemObj.parentItem=this.ParentItemNumber.value;
    this.devitemObj.itemType=this.ItemType.value;
    this.devitemObj.itemStoryPoint=this.ItemStoryPoint.value;
    this.devitemObj.itemStatus=this.ItemStatus.value;
    this.devitemObj.itemSubject=this.ItemSubject.value;
    this.devitemObj.itemDescription=this.ItemDescription.value;
    this.devitemObj.applicationName=this.ApplicationName.value;
    this.devitemObj.itemPriority=this.PriorityItem.value;
    this.devitemObj.itemSprintName=this.ItemSprintName.value;
    this.devitemObj.developerName=this.DeveloperName.value;
    this.devitemObj.testerName=this.TesterName.value;
    this.devitemObj.itemAcceptanceCtriteria=this.ItemAcceptanceCtriteria.value;
    this.devitemObj.projectName=this.ProjectName.value;
    this.submitted = true;
    if(this.DevItemId.value==null || this.DevItemId.value==''){
         this.saveDevItem();
         this.itemsaveform.reset();
    }else{
        this.devitemObj.devItemId=this.DevItemId.value;
        this.updateDevItem();
        this.itemsaveform.reset();
    }
    this.submitted=false;
  }

   saveDevItem() {
    this.devitemService.createDevItem(this.devitemObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.devitemObj = new Devitem();
  }

   updateDevItem(){
    this.devitemService.updateItem(this.devitemObj.devItemId,this.devitemObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.devitemObj = new Devitem();
  }

      getUpdateItem(itemid){
      this.devitemObj=new Devitem();
      this.devitemService.getDevItem(itemid).subscribe(data =>{
         this.itemsaveform.patchValue({
         dev_item_id:this.UpdatableItem(data,'devItemId'),
         item_number:this.UpdatableItem(data,'itemNumber'),
         parent_item_number:this.UpdatableItem(data,'parentItem'),
         item_type:this.UpdatableItem(data,'itemType'),
         item_story_point:this.UpdatableItem(data,'itemStoryPoint'),
         item_status:this.UpdatableItem(data,'itemStatus'),
         application_name:this.UpdatableItem(data,'applicationName'),
         sprint_name:this.UpdatableItem(data,'itemSprintName'),
         developer_name:this.UpdatableItem(data,'developerName'),
         tester_name:this.UpdatableItem(data,'testerName'),
         priority_item:this.UpdatableItem(data,'itemPriority'),
         item_subject:this.UpdatableItem(data,'itemSubject'),
         item_description:this.UpdatableItem(data,'itemDescription'),
         acceptance_criteria:this.UpdatableItem(data,'itemAcceptanceCtriteria'),
         project_name:this.UpdatableItem(data,'projectName')});
    });
  }

  UpdatableItem(updateItemObject:Object,updateItemName:any){
    return updateItemObject[updateItemName];
  }

    modalCloseJquery(){
    setTimeout(function() { 
          this.$('#devmodal').modal('hide'); 
          this.$("#itemSubmitButton").prop('disabled', false);
          this.$("#itemSubmitButton").prop('class', 'btn btn-info');
          this.$("#itemSubmitButton").text("Save changes");
        }, 1000);
  }

    getDevItemDataContent(responseData:Object,contentName:any){
    return responseData[contentName];
  }

   advanceSearchToggleBtnclickEvent(){
    this.advanceSearchToggleBtnclickEventstats = !this.advanceSearchToggleBtnclickEventstats; 
  }

  addItemModalOpen(){
  this.ItemSaveFormResetDropDownValues();
  }

    addItemModalClose(){
    this.itemsaveform.reset();
  }

  ItemSaveFormResetDropDownValues(){
    this.itemsaveform.patchValue({
      item_type:'Incident',
      item_status:'',
      item_assigned:'',
      application_name:'',
      priority_item:'',
      });
  }

    searchItemSubmit(searchItem){
    this.spinner.show();
      this.devitemRequestAttributes = new Devitemrequest();
     if(this.ItemNumberSRC.value==''){
      this.devitemRequestAttributes.itemNumber = null;
     }else{
      this.devitemRequestAttributes.itemNumber = this.ItemNumberSRC.value;
     }
      
      this.devitemRequestAttributes.itemSprintName = this.ItemSprintNameSRC.value;
      this.devitemRequestAttributes.itemStatus = this.ItemStatusSRC.value;
      this.devitemRequestAttributes.itemType = this.ItemTypeSRC.value;
      this.devitemRequestAttributes.applicationName = this.ApplicationNameSRC.value;
      this.devitemRequestAttributes.developerName = this.DeveloperNameSRC.value;
      this.devitemRequestAttributes.projectName = this.ProjectNameSRC.value;
      this.devitemRequestAttributes.itemPriority = this.ItemPrioritySRC.value;
      this.devitemRequestAttributes.isRefined = this.IsRefinedSRC.value;

      if(this.ItemTaskSRC.value==null){
        this.devitemRequestAttributes.task = false;
      }else{
        this.devitemRequestAttributes.task = this.ItemTaskSRC.value;
      }
      if(this.ItemSubTaskSRC.value==null){
        this.devitemRequestAttributes.subTask = false;
      }else{
      this.devitemRequestAttributes.subTask = this.ItemSubTaskSRC.value;
      }
      
      this.getPage(1);
  }

getColorClass(role: string) {
  let returnValue;
  switch (role) {
  case 'Done':
    returnValue = 'done';
    break;
  case 'Blocked':
    returnValue = 'blocked';
    break;
  case 'Inprogress':
    returnValue = 'inprogress';
    break;
  default:
    returnValue = 'white';
}
return returnValue;
}

 get DevItemId(){
    return this.itemsaveform.get('dev_item_id');
  }
  get ItemNumber(){
    return this.itemsaveform.get('item_number');
  }
   get ParentItemNumber(){
    return this.itemsaveform.get('parent_item_number');
  }
  get ItemStoryPoint(){
    return this.itemsaveform.get('item_story_point');
  }
  
  get ItemType(){
    return this.itemsaveform.get('item_type');
  }

  get ItemStatus(){
    return this.itemsaveform.get('item_status');
  }
  get ItemDescription(){
    return this.itemsaveform.get('item_description');
  }

  get ItemSubject(){
    return this.itemsaveform.get('item_subject');
  }
   get ApplicationName(){
    return this.itemsaveform.get('application_name');
  }
  get PriorityItem(){
    return this.itemsaveform.get('priority_item');
  }
  get ItemSprintName(){
    return this.itemsaveform.get('sprint_name');
  }
   get DeveloperName(){
    return this.itemsaveform.get('developer_name');
  }
  get TesterName(){
    return this.itemsaveform.get('tester_name');
  }
  get ItemAcceptanceCtriteria(){
    return this.itemsaveform.get('acceptance_criteria');
  }
  get ProjectName(){
    return this.itemsaveform.get('project_name');
  }
  // src item
  get ItemNumberSRC(){
    return this.devitemsearchform.get('search_item_number');
  }
  get ItemSprintNameSRC(){
    return this.devitemsearchform.get('adv_search_sprint_name');
  }
  get ItemStatusSRC(){
    return this.devitemsearchform.get('adv_search_item_status');
  }
  get ApplicationNameSRC(){
    return this.devitemsearchform.get('adv_search_application_name');
  }
  get DeveloperNameSRC(){
    return this.devitemsearchform.get('adv_search_assigned');
  }
  get ProjectNameSRC(){
    return this.devitemsearchform.get('adv_search_project');
  }
  get ItemPrioritySRC(){
    return this.devitemsearchform.get('adv_search_priority');
  }
   get IsRefinedSRC(){
    return this.devitemsearchform.get('adv_search_is_refined');
  }
  get ItemTypeSRC(){
    return this.devitemsearchform.get('adv_search_item_type');
  }
  get ItemTaskSRC(){
    return this.devitemsearchform.get('adv_search_chk_task');
  }
  get ItemSubTaskSRC(){
    return this.devitemsearchform.get('adv_search_chk_sub_task');
  }
  

}