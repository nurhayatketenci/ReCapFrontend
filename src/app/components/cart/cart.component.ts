import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CartItem } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  rentalAddForm: FormGroup;
  customers: Customer[] = []; // CustomerDetailDto listesi
  currentCar: CarDetailDto;
  rentDate: Date;
  returnDate: Date;
  totalPrice:number;
  cartItems:CartItem[]=[];
  dataLoaded = false;
  cartTotal:number;
  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastrService:ToastrService,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    this.cartItems = this.cartService.cartList();
    // console.log(this.cartItems)
    this.cartService.calculateCart(this.cartItems);
    
    this.cartService.cartSummary.subscribe(response => {
      this.cartTotal = response;
    });

    this.dataLoaded = true;    
  }

}
