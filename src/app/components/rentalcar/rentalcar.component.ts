import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Customer } from 'src/app/models/customer';
import { RentableCar } from 'src/app/models/rentablecar';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentalcar',
  templateUrl: './rentalcar.component.html',
  styleUrls: ['./rentalcar.component.css']
})
export class RentalcarComponent implements OnInit {
  
  carId:number;
  rentalAddForm: FormGroup;
  customers: Customer[] = []; // CustomerDetailDto listesi
  currentCar: CarDetailDto;
  rentDate: Date;
  returnDate: Date;
  totalPrice:number;
  rentableCar:RentableCar
  dataLoaded = false;
  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastrService:ToastrService,
    private cartService:CartService,
    
 
  ) { }

  ngOnInit(): void {
    this.createRentalAddForm();
   this.activedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetail(params["carId"]);
      }
    });
  }
  
  getCarDetail(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
    this.currentCar= response.data[0];
    console.log(response.data)
    this.rentDate = new Date();
    this.returnDate = new Date();
  
    this.getCustomerDetails();
  
      // console.log(this.currentCar)
      //tam ekleme kontrolü
    
    });
  }

  createRentalAddForm() {
     this.rentalAddForm = this.formBuilder.group({
      cUsersId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['']
     });
  }
  
  checkCarRent(){
   
    this.rentalService.getRentalByCarId(this.currentCar.carId).subscribe(response=>{
      if(response.data[0]==null){
      this.addToCart()
      return true
      }
      let lastItem=response.data[response.data.length-1]
      if(lastItem.returnDate==null){
        this.toastrService.error("dönüş tarihi belirtilmedi.")
      return this.router.navigate(['/cars'])
      }
      let returnDate=new Date(lastItem.returnDate)
      let rentDate=new Date(this.rentalAddForm.value.rentDate)
      if(rentDate < returnDate){
      this.toastrService.warning("Bu tarihlerde kiralayamazsınız")
      return this.router.navigate(['/cars'])
      }
      this.addToCart()
      return true
    })
  }
  addToCart() {
    
    if (this.rentalAddForm.valid) {
      let carId=Number(this.activedRoute.snapshot.paramMap.get('carId'))
      this.rentalAddForm.value.cUsersId=Number(this.rentalAddForm.value.cUsersId)
      this.rentableCar = Object.assign({
        carId:carId
        
      }, this.rentalAddForm.value);
       //this.cartService.addToCart(this.rentableCar)
      
       this.rentalService.setRentingCar(this.rentableCar)
       this.toastrService.success('Sepete eklendi','yönlendiriliyorsunuz.')
       return this.router.navigate(['/creditCard'])
      
     }
   
       return  this.toastrService.error('Formunuz eksik', 'Hata');

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
    console.log(this.totalPrice)
  }


}
