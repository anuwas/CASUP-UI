import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskSchedulerService {

private baseUrl = '';

 constructor(private http:HttpClient) { 
  this.baseUrl = GlobalConstants.apiURL+'/scheduled-tasks';
  }

  getAllScheduledTaskByRequest(requestObj:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(requestObj);
    return this.http.get(`${this.baseUrl}/all-scheduled-task-list/${page}/${srcsupitemstr}`);
  }

  createScheduledTask(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-scheduled-task', item);
  }

  updateScheduledTask(taskSchedulerId: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-scheduled-task/${taskSchedulerId}`, value);
  }

  getScheduledTask(taskSchedulerId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/view-scheduled-task/${taskSchedulerId}`);
  }

  deleteScheduledTask(taskSchedulerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-scheduled-task/${taskSchedulerId}`, { responseType: 'text' });
  }

}
