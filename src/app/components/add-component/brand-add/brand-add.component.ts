import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup
   constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
    brandName:["",Validators.required]
   })
     }
     addBrand(){
       if(this.brandAddForm.valid){
        let brandModel=Object.assign({}, this.brandAddForm.value)
        this.brandService.addBrand(brandModel).subscribe(data=>{
         this.toastrService.success(data.message,"BAŞARILI")
        })
        }
       else{
         this.toastrService.error("HATA OLUŞTU")
       }
         }
    deleteBrand(){
      if(this.brandAddForm.valid){
        let brandModel=Object.assign({}, this.brandAddForm.value)
        this.brandService.deleteBrand(brandModel).subscribe(data=>{
         this.toastrService.success("BAŞARILI")
        })
        }
       else{
         this.toastrService.error("HATA OLUŞTU")
       }
         }
    }

