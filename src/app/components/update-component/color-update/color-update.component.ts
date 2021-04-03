import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup
  color:Color
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService,private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      this.getColorById(params["colorId"])
    })
  }

  createColorUpdateForm(){ 
    this.colorUpdateForm=this.formBuilder.group({
    colorName:["",Validators.required],
    colorId:[""]
   })
 }
 getColorById(colorId:number){
  this.colorService.getColorById(colorId).subscribe(response=>{
    this.color=response.data
  })
  }
  updateColor(){
    if(this.colorUpdateForm.valid){      
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      colorModel.colorId=this.color.colorId
       this.colorService.updateColor(colorModel).subscribe(response=>{
        this.toastrService.success("güncellendi")
      },responseError=>{
        this.toastrService.success("hata olustu")
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }    
  }
}
