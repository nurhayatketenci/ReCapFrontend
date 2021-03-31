import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
 colorAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.colorAddForm=this.formBuilder.group({
    colorName:["",Validators.required]
   })
     }
     addColor(){
       if(this.colorAddForm.valid){
        let colorModel=Object.assign({}, this.colorAddForm.value)
        this.colorService.addColor(colorModel).subscribe(data=>{
        console.log(data)
         this.toastrService.success(data.message,"BAŞARILI")
        })
        }
       else{
         this.toastrService.error("HATA OLUŞTU")
       }
         }
}
