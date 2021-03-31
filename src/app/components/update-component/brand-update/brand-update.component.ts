import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
   brandUpdateForm:FormGroup
   brand:Brand
   constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      this.getBrandById(params["brandId"])
    })
  }
   createBrandUpdateForm(){ 
    this.brandUpdateForm=this.formBuilder.group({
    brandName:["",Validators.required],
    brandId:[""]
   })
 }
 getBrandById(brandId:number){
 this.brandService.getBrandById(brandId).subscribe(response=>{
   this.brand=response.data
 })
 }
updateBrand(){
  if(this.brandUpdateForm.valid){      
    let brandModel = Object.assign({},this.brandUpdateForm.value)
    brandModel.brandId=this.brand.brandId
     this.brandService.updateBrand(brandModel).subscribe(response=>{
      this.toastrService.success("güncellendi")
    },responseError=>{
      this.toastrService.success("hata olustu")
    })
  }else{
    this.toastrService.error("Form eksik","Hata")
  }    
}
}
