import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../shared/rest-api.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
   categoryName!: string;
   itemId!:number;
  itemDetails: any;
  constructor(private activeRoute:ActivatedRoute ,
              private restApi:RestApiService ,
              private route:Router) {

    this.activeRoute.params.subscribe(params => {
      this.itemId = params.id;
    })

    this.activeRoute.url.subscribe(data => {
      this.categoryName = data[0].path
    })

  }

  ngOnInit(): void {
    this.getItemDetails()
  }

  getItemDetails(){
    this.restApi.handleUrlRequest(`${environment.baseUrl}/api/${this.categoryName}/${this.itemId}/`).subscribe(data=>{
      console.log(data)
      this.itemDetails = data
    })
  }

}
