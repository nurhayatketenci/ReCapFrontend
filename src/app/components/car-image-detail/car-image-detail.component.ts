import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image-detail',
  templateUrl: './car-image-detail.component.html',
  styleUrls: ['./car-image-detail.component.css']
})
export class CarImageDetailComponent implements OnInit {

  cars: CarDetailDto[] = [];
  car: CarDetailDto
  Images: string[] = []
  defaultImg = "default.png"
  dataLoaded = false;
  apiUrl: string = "https://localhost:44339/Images/";
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailsByCarId(params["carId"]);

      }
    })
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe(response => {
      this.cars = response.data;
      this.car = response.data[0]
      this.Images = this.car.images
      this.dataLoaded = true;
    });
  }
  getSliderClassName(index: number) {
    if (index == 0) {
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

}