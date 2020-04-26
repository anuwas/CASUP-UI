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

  getReleaseItemById(releaseItemId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/view-release-item/${releaseItemId}`);
  }

  createReleaseItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-release-item', item);
  }

  updateReleaseItem(releaseItemId: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-release-item/${releaseItemId}`, value);
  }

  deleteReleaseItem(releaseItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-release-item/${releaseItemId}`, { responseType: 'text' });
  }
}
