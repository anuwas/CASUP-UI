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
      search_item_number:new FormControl(null),
      adv_search_from_date:new FormControl(),
      adv_search_to_date:new FormControl(),
      adv_search_opne_date:new FormControl(false),
      adv_search_close_date:new FormControl(false),
      adv_search_application_name:new FormControl(null),
      adv_search_item_status:new FormControl(null),
      adv_search_item_type:new FormControl(null),
      adv_search_assigned:new FormControl(null),
      adv_search_sla:new FormControl(null),
      adv_search_debt:new FormControl(null),
      adv_search_priority:new FormControl('-1'),
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
   /*
    this.supitemservice.updateItem(this.item.id,this.item)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.item = new Supitem();
    */
  }

    modalCloseJquery(){
  	setTimeout(function() { 
          this.$('#modal').modal('hide'); 
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
      priority_item:'5',
      });
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

}
