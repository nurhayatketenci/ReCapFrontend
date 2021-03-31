import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {
cars:CarDetailDto[]
  constructor(private carService:CarService) { }

  ngOnInit(): void {
  this.getCars()
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data
    });
  }
}
