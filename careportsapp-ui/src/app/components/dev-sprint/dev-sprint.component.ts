import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from '../../common/global-constants';
import { Devsprint } from '../../entity/devsprint';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable,Subject } from "rxjs";
import { Router } from '@angular/router';
import { DevItemService } from '../../service/devitem.service';

@Component({
  selector: 'app-dev-sprint',
  templateUrl: './dev-sprint.component.html',
  styleUrls: ['./dev-sprint.component.css']
})
export class DevSprintComponent implements OnInit {

config: any; 

    constructor(private devitemService: DevItemService,private spinner: NgxSpinnerService,private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 50,
      totalItems:3
    };
   }

  ngOnInit() {
  }

}
