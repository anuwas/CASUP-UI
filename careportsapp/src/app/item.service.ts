import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

private baseUrl = 'http://localhost:8091/api/';

  constructor(private http:HttpClient) { }

  getItemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'item');
  }
}
