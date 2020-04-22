import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = '';

  constructor(private http:HttpClient) { 
    this.baseUrl = GlobalConstants.apiURL+'/config';
  }

    getAllApplicatonUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-app-user-list`);
  }

  getAllApplicatons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-applications`);
  }

  getDevSprints(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-dev-sprints`);
  }

}
