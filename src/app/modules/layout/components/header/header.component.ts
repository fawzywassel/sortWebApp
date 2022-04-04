import {Component, OnInit, Inject, Optional, InjectionToken} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../../../../shared/rest-api.service";
import {LayoutConfig} from "../../options.config";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links = ["films","people" ,"planets" , "species" ,"starships", "vehicles"]
  searchHistoryList :string[]  = ["searchHistoryItem"]
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required])
  });
  limitOfSearch = 1; // initial as default value
  categoryName: string = "films";
  constructor( private restApi:RestApiService ,private activeRoute:ActivatedRoute ,options :LayoutConfig) {
      this.limitOfSearch = options.maxSearchLength

  }

  ngOnInit(): void {
  }


  search(text :string, fromOldSearch?:boolean){
    if(!fromOldSearch){
      if(this.searchHistoryList.length == this.limitOfSearch){
        this.searchHistoryList.shift()
      }
      this.searchHistoryList.push(text)
    }
    this.restApi.search(this.categoryName,text).subscribe(res=>{
      this.restApi.lastSearchResult.next(res)
    })
  }

}
