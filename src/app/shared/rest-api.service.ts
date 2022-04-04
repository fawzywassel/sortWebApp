import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ResponseObject} from "./types";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  lastSearchResult:BehaviorSubject<any> = new BehaviorSubject<any>({})

  constructor(private _http: HttpClient) {
  }

  getCategoryItems(categoryName:string):Observable<ResponseObject>{
    return this._http.get<ResponseObject>(`${environment.baseUrl}/api/${categoryName}`)
  }

  handleUrlRequest(url:string):Observable<ResponseObject>{
    return this._http.get<ResponseObject>(url)
  }

  search(categoryName:string, searchText:string){
    return this._http.get<ResponseObject>(`${environment.baseUrl}/api/${categoryName}/?search=${searchText}`)
  }
}
