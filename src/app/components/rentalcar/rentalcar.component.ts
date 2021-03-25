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
  car: CarDetailDto;
  cars: CarDetailDto[];
  rental: Rental;
  customers: Customer[] = [];
  rentDate: Date;
  returnDate: Date;
  rentForm: FormGroup;
  payVisible = false;
  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.getCarDetail(params['carId']);
      this.getCustomers(), this.createRentForm();
    });
  }
  
  getCarDetail(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe((c) => {
      this.customers = c.data;
    });
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
      carId: [''],
      customerId: ['', Validators.required],
    });
  }

  rent() {
    if (this.rentForm.valid) {
      var data = Object.assign({}, this.rentForm.value);
      data.carId = this.car.carId;
      data.customerId = parseInt(data.customerId);
      this.rental = data;
      this.payVisible = true;

      
      this.router.navigate(['']);
    } else {
      console.log('Bilgilerin dogrulugundan emin olun.', 'HATA!');
    }

}
}
