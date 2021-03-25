import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
cars:CarDetailDto[]=[];
brands: Brand[] = [];
colors: Color[] = [];
dataLoaded=false
filterCar="";
brandFilter: number = 0;
colorFilter: number = 0;


  constructor(private carService:CarService
    ,private activatedRoute:ActivatedRoute,private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params["brandId"])
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      } else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else if(params["brandId"] && params["colorId"]){
        this.getCarsBySelect(params["brandId"],params["colorId"])
      } else{
        this.getCars()
      }
})

  }
getCars(){
this.carService.getCars().subscribe(response=>{
  this.cars=response.data
  this.dataLoaded=true;
})}
getCarsByBrand(brandId:number){
  this.carService.getCarsByBrand(brandId).subscribe(response=>{
    this.cars=response.data
    this.dataLoaded=true;
  }) }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsBySelect(brandId:number, colorId:number){
    this.carService.getCarsBySelect(brandId,colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  setFilter(){
    this.activatedRoute.params.subscribe(param => {
       if (param["filter"]){
          this.brandFilter = param["brandId"];
          this.colorFilter = param["colorId"];
       }
    })
 }
 clearFilter(){
  this.brandFilter = 0;
  this.colorFilter = 0;
}
}
