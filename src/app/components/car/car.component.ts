import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetailDto[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  dataLoaded = true;
  filterCarText = '';
  brandFilter: number = 0;
  colorFilter: number = 0;
  isCarAvail: boolean;
  apiUrl: string = 'https://localhost:44339/Images/';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsBySelect(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
   
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsBySelect(brandId: number, colorId: number) {
    this.carService.getCarsBySelect(brandId, colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  isCarAvailable(carId: number) {
    console.log(carId)
    this.rentalService.isCarAvailable(carId).subscribe(
      (response) => {
        console.log(response)
        this.isCarAvail = response;
        this.toastrService.success('olumlu sonuç, yönlendirme yapılacak', 'Uyarı');
        this.route.navigate(["rent/car/"+carId]);
      },
      (responseError) => {
        console.log(responseError)
        this.toastrService.error('Bu araç kiralanamaz', 'Uyarı');
      }
    );
  }

  setFilter() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['filter']) {
        this.brandFilter = param['brandId'];
        this.colorFilter = param['colorId'];
      }
    });
  }
  clearFilter() {
    this.brandFilter = 0;
    this.colorFilter = 0;
  }
}
