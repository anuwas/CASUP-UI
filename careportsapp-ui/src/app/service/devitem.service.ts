import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevItemService {

//private baseUrl = 'http://10.74.209.146:8091/api/dev';
private baseUrl = 'http://localhost:8091/api/dev';

  constructor(private http:HttpClient) { }

    getDevItemList(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-item-list/${page}`);
  }

  getAllDevItemByRequest(requestObj:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(requestObj);
    return this.http.get(`${this.baseUrl}/all-dev-item/${page}/${srcsupitemstr}`);
  }

    createDevItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-dev-item', item);
  }

  updateItem(devItemId: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/devitem/${devItemId}`, value);
  }

    getDevItem(devItemId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/devitem/${devItemId}`);
  }

     deleteItem(devItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/devitem/${devItemId}`, { responseType: 'text' });
  }
}
