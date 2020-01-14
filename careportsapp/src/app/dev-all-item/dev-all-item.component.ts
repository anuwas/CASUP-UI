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
    item_id:new FormControl('',[Validators.required]),
    item_number:new FormControl(),
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

    get ItemNumber(){
    return this.itemsaveform.get('item_number');
  }

}
