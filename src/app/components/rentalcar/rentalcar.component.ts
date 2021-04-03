import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentalcar',
  templateUrl: './rentalcar.component.html',
  styleUrls: ['./rentalcar.component.css'],
})
export class RentalcarComponent implements OnInit {

  // kullanılmayanları sil
  carId: number;
  rental: Rental;
  rentalAddForm: FormGroup;
  customers: Customer[] = [];
  currentCar: CarDetailDto;
  rentDate: Date;
  returnDate: Date;
  totalPrice: number;
 customerId:number
  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.rentDate = new Date();
    this.returnDate = new Date();

    this.createRentalAddForm();
    this.getCustomerDetails();

    this.activedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params.carId
        this.getCarDetail(params.carId);
      }
    });

  }

  getCarDetail(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.currentCar = response.data[0];
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
 
      rentDate: ['', Validators.required],
      returnDate: ['']
    });
  }

  
  addToCart() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value)
      rentalModel.carId = this.currentCar.carId
      rentalModel.customerId=this.customerId
      rentalModel.brandName = this.currentCar.brandName
      rentalModel.colorName = this.currentCar.colorName
      rentalModel.description = this.currentCar.description
      rentalModel.modelYear = this.currentCar.modelYear
      rentalModel.dailyPrice = this.currentCar.dailyPrice
      rentalModel.totalPrice =  this.totalPrice
        this.cartService.addToCart(rentalModel)
        this.toastrService.success('Sepete eklendi', 'Sepet');
       } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
  }

  getCustomerDetails() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;
    });
  }
 

  calcTotalPrice() {
    let startDate = new Date(this.rentalAddForm.value.rentDate);
    let endDate = new Date(this.rentalAddForm.value.returnDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      this.totalPrice = 0;
    } else if (startDate > endDate) {
      this.totalPrice = 0;
    } else {
      let dateDiff = Math.floor(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
      );

      this.totalPrice = dateDiff * this.currentCar.dailyPrice;
    }
  }
  
}
