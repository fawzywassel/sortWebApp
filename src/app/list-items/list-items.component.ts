import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../shared/rest-api.service";
import {ResponseObject} from "../shared/types";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  itemsList!: any[];
  categoryName!:string;
  nextUrl!:string ;
  previousUrl!:string;
  heightRanges = [100,200];
  heightValues = ['Low','Normal','High'];
  lengthRanges =[100,1000];
  lengthValues = ['Small','Normal','Large'];
  constructor( private activeRoute:ActivatedRoute ,
               private restApi:RestApiService ,
               private route:Router
               ) {
    activeRoute.url.subscribe(data => {
      this.categoryName = data[0].path
      this.getItems(this.categoryName)
    })
  }
  ngOnInit(): void {
    this.restApi.lastSearchResult.subscribe(res=>{
      this.handleResponse(res)
    })
  }

  getItems(key: string) {
    this.restApi.getCategoryItems(key).subscribe(res=>{
        this.handleResponse(res)
    })
  }

  paginateData(snapshot:'next'| 'previous') {
    this.restApi.handleUrlRequest(snapshot== 'next' ? this.nextUrl : this.previousUrl).subscribe(res=>{
      this.handleResponse(res)
    })
  }


  handleResponse(res:ResponseObject){
    this.itemsList = res.results;
    this.nextUrl = res.next;
    this.previousUrl= res.previous;
    if(this.categoryName == 'people'){
      this.itemsList.forEach(e=>{
        this.restApi.handleUrlRequest(e.homeworld).subscribe((data:any)=>{
          e.homeworldValue = data.name;
        })
      })
    }
  }



  checkNumberRange(number:any, ranges:number[] ,values:string[]){
    // this check because people[1] has length value '1,600'
    if(isNaN(Number(number)) && number !== undefined){
     let concatValues = ''
      number.split(',').forEach((e:string)=>{
        concatValues = concatValues + e
      })
      number = concatValues
    }
    // this check will convert number parameter to Number value and confirm it's A Number
    // then will check values and return value
    if(!isNaN(Number(number))){
      if(Number(number) > ranges[1]){
       return values[2]
      }else{
        if(Number(number) < ranges[1] && Number(number) > ranges[0]){
          return values[1]
        }else{
          return values[0]
        }
      }
    }else{
      return number
    }
  }

  showDetails(categoryItem: any) {
    const url = categoryItem.url.split('/');
    const lastSegment = url.pop() || url.pop();
    this.route.navigate([this.categoryName,lastSegment])
  }
}
