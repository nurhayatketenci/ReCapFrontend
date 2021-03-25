import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  colors:Color[]
  brands:Brand[]
  cars:CarDetailDto[]
  brandFilter:number;
  colorFilter:number;
  constructor(private carService:CarService,private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data
    })
  }
  setCurrentBrand(brandId:number){
    return(brandId===this.brandFilter?true:false)
  }
  setCurrentColor(colorId:number){
    return(colorId===this.colorFilter?true:false)
  }
  getcarbybrandandcolorid(brandId:number, colorId:number){
    this.carService.getcarbybrandandcolorid(brandId,colorId)
    .subscribe((response)=> {
      this.cars = response.data
    })
  }
}
