import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Customer, CustomerDetail } from 'src/app/models/customer';
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
  carId: number;
  rental: Rental;
  rentalAddForm: FormGroup;
  customers: Customer[] = [];
  currentCar: CarDetailDto;
  customerDetail:CustomerDetail[]=[];
  rentDate: Date;
  returnDate: Date;
  totalPrice: number;
  customerId: number = 0;
  findexPuan: number;
  customer: Customer;
 
  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rentDate = new Date();
    this.returnDate = new Date();
    this.createRentalAddForm();
    this.getCustomerDetails();

    this.activedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params.carId;
        this.getCarDetail(params["carId"]);
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
      rentStartDate: ['', Validators.required],
      rentEndDate: [''],
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;
      this.customer = this.customers.find(customer => customer.cUsersId == this.customerId)
    });
  }

  async addToCart() {
    if (this.rentalAddForm.invalid) {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
    
   let rentalModel = Object.assign({}, this.rentalAddForm.value);
    rentalModel.carId = this.currentCar.carId;
    rentalModel.customerId = Number(this.customerId);
    rentalModel.brandName = this.currentCar.brandName;
    rentalModel.colorName = this.currentCar.colorName;
    rentalModel.description = this.currentCar.description;
    rentalModel.modelYear = this.currentCar.modelYear;
    rentalModel.dailyPrice = this.currentCar.dailyPrice;
    rentalModel.totalPrice = this.totalPrice;
    console.log(await this.isRentable(rentalModel))
    if(!await this.isRentable(rentalModel)){
      this.toastrService.error("Bu araba belirlenen tarihler aras??nda zaten kiralanm????.")
      this.router.navigate(['/cars'])
      return
    }
    this.getCustomerById(rentalModel.customerId);
    if (this.customer.findexPuan < this.currentCar.findeksPuan) {
      this.toastrService.error('findeks puan??n??z yetersizdir.');
      this.router.navigate(['/cars']);
      return
    }
    this.cartService.addToCart(rentalModel);
    this.toastrService.success('Sepete eklendi');
    this.router.navigate(['/cart']);
   
  }
  getCustomerById(customerId: number) {
    this.customer = this.customers.find(
      (customer) => customer.cUsersId == customerId
    );
  }

  async isRentable(rental:Rental){
    return (await this.rentalService.isCarAvailable(rental).toPromise()).success
  }

  calcTotalPrice() {
    let startDate = new Date(this.rentalAddForm.value.rentStartDate);
    let endDate = new Date(this.rentalAddForm.value.rentEndDate);
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
