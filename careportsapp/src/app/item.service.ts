import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

private baseUrl = 'http://localhost:8091/api';

  constructor(private http:HttpClient) { }

  getItemList(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/itemlist/${page}`);
  }

  createItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-item', item);
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
}
