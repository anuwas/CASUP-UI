import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevItemService {

 //private baseUrl = 'http://10.74.209.146:8091/api';
private baseUrl = 'http://localhost:8091/api/dev';

  constructor(private http:HttpClient) { }

    getDevItemList(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-item-list/${page}`);
  }

  getAllDevItemByRequest(requestObj:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(requestObj);
    return this.http.get(`${this.baseUrl}/all-dev-item/${page}/${srcsupitemstr}`);
  }
}
