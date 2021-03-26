import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentalcar',
  templateUrl: './rentalcar.component.html',
  styleUrls: ['./rentalcar.component.css']
})
export class RentalcarComponent implements OnInit {
  
  rentalAddForm: FormGroup;
  customers: Customer[] = []; // CustomerDetailDto listesi
  currentCar: CarDetailDto;
  rentDate: Date;
  returnDate: Date;
  totalPrice:number = 0;
  dataLoaded = false;
  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
 
  ) { }

  ngOnInit(): void {
    this.rentDate = new Date();
    this.returnDate = new Date();

    this.getCustomerDetails();
    this.createRentalAddForm();

    this.activedRoute.queryParams.subscribe((params) => {
      if (params.carId) {
        this.getCarDetail(params.carId);
      }
    });
  }
  
  getCarDetail(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.currentCar= response.data[0];
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }


  addToCart() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      rentalModel.carId = this.currentCar.carId;
    
    } else {
      console.log('Formunuz eksik', 'Hata');
    }
  }

 
  getCustomerDetails() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }
  
  calcTotalPrice() {
    let startDate = new Date(this.rentalAddForm.value.rentDate);
    let endDate = new Date(this.rentalAddForm.value.returnDate);
    if( isNaN(startDate.getTime()) || isNaN(endDate.getTime())   ){
      this.totalPrice = 0;
    } else if ( startDate > endDate ) {
      this.totalPrice = 0;    
    } else {
      let dateDiff = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
      this.totalPrice = dateDiff * this.currentCar.dailyPrice;
    }
  }


}
