import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carImages: CarImage[] = [];
  apiUrl : string = "https://localhost:44339/Images/";
  constructor(private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getImages()
  }
 getImages(){
 this.carImageService.getCarImages().subscribe(response=>{
this.carImages=response.data;
 })
  }
}
