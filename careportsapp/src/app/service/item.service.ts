import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

//private baseUrl = 'http://10.74.209.146:8091/api';
private baseUrl = 'http://localhost:8091/api';

  constructor(private http:HttpClient) { }

  getItemList(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-item-list/${page}`);
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

  getAdvsearchItem(pagenumber:number,advsrcitem: any): Observable<Object> {
    return this.http.get(`${this.baseUrl}/adv-search-supitem/${pagenumber}/${advsrcitem}`);
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
}
