import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { ReleaseService } from '../../service/release.service';
import { Release } from '../../entity/release';
import { Releasesrcrequest } from '../../dto/releasesrcrequest';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable,Subject } from "rxjs";

@Component({
  selector: 'app-release-item',
  templateUrl: './release-item.component.html',
  styleUrls: ['./release-item.component.css']
})
export class ReleaseItemComponent implements OnInit {

  constructor(private releaseService: ReleaseService,private spinner: NgxSpinnerService) {
  	this.config = {
      currentPage: 1,
      itemsPerPage: 50,
      totalItems:3
    };
   }

config: any; 
releasesrcrequestAttributes : Releasesrcrequest=new Releasesrcrequest();
releaseObj : Release = new Release();
releaseObjList: Observable<Release[]>;
advanceSearchToggleBtnclickEventstats: boolean = false;
submitted = false;
public date: any;

  ngOnInit() {
  	this.getPage(1);
  }

   getPage(page: number) {
      this.spinner.show();
      this.config.currentPage=page;
      console.log(this.releasesrcrequestAttributes);
      this.releaseService.getAllReleaseItemByRequest(this.releasesrcrequestAttributes,page).subscribe(data =>{

        this.releaseObjList = this.getReleaseItemDataContent(data,'content');
        this.config.totalItems = this.getReleaseItemDataContent(data,'totalElements');
        this.spinner.hide();
      });  
    }

  releaseitemsaveform=new FormGroup({
    application_name:new FormControl(),
    uat_rfc:new FormControl(),
    uat_bug:new FormControl(),
    uat_start_date:new FormControl(),
    uat_end_date:new FormControl(),
    prd_rfc:new FormControl(),
    prd_release_date:new FormControl(),
    prd_bug:new FormControl(),
    item_subject:new FormControl(),
    item_description:new FormControl(),
    comment:new FormControl()
  });  

    releasesrcform = new FormGroup({
      src_application_name:new FormControl('All')
    });

    saveAndUpdateReleaseItem(saveItem){
    this.releaseObj = new Release();
    this.releaseObj.itemSubject=this.ItemSubject.value;
    this.releaseObj.itemDescription=this.ItemDescription.value;
    this.releaseObj.applicationName=this.ApplicationName.value;
    this.releaseObj.uatStartDate=this.UatStartDate.value;
    this.releaseObj.uatSignoffDate=this.UatSignoffDate.value;
    this.releaseObj.uatRfcNumber=this.UatRfcNumber.value;
    this.releaseObj.postUatBugCount=this.PostUatBugCount.value;
    this.releaseObj.prdReleaseDate=this.PrdReleaseDate.value;
    this.releaseObj.prdRfcNumber=this.PrdRfcNumber.value;
    this.releaseObj.postPrdBugCount=this.PostPrdBugCount.value;
    this.releaseObj.comment=this.Comment.value;
    this.submitted = true;
    this.saveReleaseItem();
    this.releaseitemsaveform.reset();
  }



   saveReleaseItem() {
    this.releaseService.createReleaseItem(this.releaseObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.releaseObj = new Release();
  }

  getReleaseItemDataContent(responseData:Object,contentName:any){
  console.log(responseData[contentName]);
    return responseData[contentName];
  }

  advanceSearchToggleBtnclickEvent(){
    this.advanceSearchToggleBtnclickEventstats = !this.advanceSearchToggleBtnclickEventstats; 
  }

   modalCloseJquery(){
    setTimeout(function() { 
          this.$('#releasemodal').modal('hide'); 
          this.$("#itemSubmitButton").prop('disabled', false);
          this.$("#itemSubmitButton").prop('class', 'btn btn-info');
          this.$("#itemSubmitButton").text("Save changes");
        }, 1000);
  }

  get ItemSubject(){
    return this.releaseitemsaveform.get('item_subject');
  }
  get ItemDescription(){
    return this.releaseitemsaveform.get('item_description');
  }
  get ApplicationName(){
    return this.releaseitemsaveform.get('application_name');
  }
  get UatStartDate(){
    return this.releaseitemsaveform.get('uat_start_date');
  }
  get UatSignoffDate(){
    return this.releaseitemsaveform.get('uat_end_date');
  }
  get UatRfcNumber(){
    return this.releaseitemsaveform.get('uat_rfc');
  }
  get PostUatBugCount(){
    return this.releaseitemsaveform.get('uat_bug');
  }
  get PrdReleaseDate(){
    return this.releaseitemsaveform.get('prd_release_date');
  }
  get PrdRfcNumber(){
    return this.releaseitemsaveform.get('prd_rfc');
  }
  get PostPrdBugCount(){
    return this.releaseitemsaveform.get('prd_bug');
  }
  get Comment(){
    return this.releaseitemsaveform.get('comment');
  }

  get ApplicationNameSRC(){
    return this.releasesrcform.get('src_application_name');
  }

}
