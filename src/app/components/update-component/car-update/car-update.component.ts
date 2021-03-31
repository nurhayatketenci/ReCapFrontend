import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CaroperationService } from 'src/app/services/caroperation.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
carUpdateForm:FormGroup
car:Car
carId:number
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.carId=params["carId"]
        this.getCarById(params["carId"])
      }
      console.log(params["carId"])
      
    })
  
  }
  createCarUpdateForm(){ 
    this.carUpdateForm=this.formBuilder.group({
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required]
   })
 }
 async getCarById(carId:number){
 this.car=(await this.carService.getCarUpdateById(carId).toPromise()).data
  }

  
  updateCar(){
    console.log(this.carUpdateForm.value)
    if(this.carUpdateForm.valid){      
      let carModel = Object.assign({},this.carUpdateForm.value)
      carModel.carId=Number(this.carId)
      carModel.carName=String(this.car.carName)
      console.log(carModel)
       this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success("güncellendi")
      },responseError=>{
        this.toastrService.error("hata olustu",responseError.error.message)
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }    
  }
}
