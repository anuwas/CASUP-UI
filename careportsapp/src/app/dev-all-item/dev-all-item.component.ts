import { Component, OnInit } from '@angular/core';
import { DevItemService } from '../service/devitem.service';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Devitem } from '../entity/devitem';
import { Devitemrequest } from '../entity/devitemrequest';


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

      itemsearchform = new FormGroup({
      search_item_number:new FormControl(null),
      adv_search_from_date:new FormControl(),
      adv_search_to_date:new FormControl(),
      adv_search_opne_date:new FormControl(false),
      adv_search_close_date:new FormControl(false),
      adv_search_application_name:new FormControl(null),
      adv_search_bounce:new FormControl(null),
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
  });

    getDevItemDataContent(responseData:Object,contentName:any){
    return responseData[contentName];
  }

    get ItemNumber(){
    return this.itemsaveform.get('item_number');
  }

}
