import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';

import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupItemService {

  private baseUrl = '';

  constructor(private http:HttpClient) { 
    this.baseUrl = GlobalConstants.apiURL;
  }

  getItemList(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-item-list/${page}`);
  }

  getAllSupItemListSrc(srcsupitem:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(srcsupitem);
    return this.http.get(`${this.baseUrl}/all-src-item-list/${page}/${srcsupitemstr}`);
  }

  getAllSupItemListSrcForExcelExport(srcsupitem:object,type: any): Observable<Object> {
    let srcsupitemstr = JSON.stringify(srcsupitem);
    return this.http.get(`${this.baseUrl}/all-src-item-list-excel-export/${srcsupitemstr}/${type}`);
  }

  getItemListByItemNumber(page: number,itemNumber: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-item-list/${page}/${itemNumber}`);
  }

  getItemActivityListByItemNumber(itemId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/sup-item-activity-list/${itemId}`);
  }

  createItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-item', item);
  }

  saveSupItemActivity(supitemactivity: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-supitem-activity', supitemactivity);
  }

  getItem(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/item/${id}`);
  }

   updateItem(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/item/${id}`, value);
  }

   deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/item/${id}`, { responseType: 'text' });
  }

  getActiveItemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/active-item-list`);
  }

  getActiveReportItemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sup-item-active-report-list`);
  }

  getActiveProblemRecordItemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sup-item-active-problem-record-list`);
  }
}
