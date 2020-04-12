import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

private baseUrl = '';

  constructor(private http:HttpClient) { 
    this.baseUrl = GlobalConstants.apiURL+'/releases';
  }

  

  getAllReleaseItemByRequest(requestObj:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(requestObj);
    return this.http.get(`${this.baseUrl}/all-release-item-list/${page}/${srcsupitemstr}`);
  }

  createReleaseItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-release-item', item);
  }
}
