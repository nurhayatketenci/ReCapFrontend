import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  
 carAddForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService ) { }

  ngOnInit(): void {
   this.createCarAddForm();
  }
  createCarAddForm(){
 this.carAddForm=this.formBuilder.group({
 modelYear:["",Validators.required],
 dailyPrice:["",Validators.required],
 description:["",Validators.required],
 brandId:["",Validators.required],
 colorId:["",Validators.required],
 carName:["",Validators.required]
})
  }
  add(){
    if(this.carAddForm.valid){
     let carModel=Object.assign({}, this.carAddForm.value)
     this.carService.add(carModel).subscribe(data=>{
       console.log(data)
      this.toastrService.success(data.message,"BAŞARILI")
     })
     }
    else{
      this.toastrService.error("HATA OLUŞTU")
    }
      }
 
}
