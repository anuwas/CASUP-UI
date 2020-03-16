import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8091/api/releases';

  getAllReleaseItemByRequest(requestObj:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(requestObj);
    return this.http.get(`${this.baseUrl}/all-release-item-list/${page}/${srcsupitemstr}`);
  }

  createReleaseItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-release-item', item);
  }
}
