import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cart';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class CreditCardComponent implements OnInit {
  TotalPrice: number;
  cUsersId: number;
  cardForm: FormGroup;
  cartList: CartItem[];
  rental: Rental;
  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.createPaymentFrom();

    this.activatedRoute.params.subscribe((params) => {
      if (params['cUsersId']) {
        this.cUsersId = params['cUsersId'];
      }
    });

    this.cartService.data.subscribe((response) => {
      this.TotalPrice = response;
    });
  }

  addPayment() {
    if (this.cardForm.valid) {
      let paymentModel = Object.assign({}, this.cardForm.value);
      //payment model credikartını kaydetmek için
      if (this.paymentService.cardVerification(paymentModel)) {
        let payment = new Payment();
        this.cUsersId = Number(this.cUsersId);
        payment.CUsersId = this.cUsersId;
        payment.RentId = payment.TotalPrice = this.TotalPrice;
        this.paymentService.addPayment(payment).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Ödeme');
            this.cartList = this.cartService.cartList();
            this.cartList.forEach((cart) => {
              let rent = Object.assign({}, this.rental);
              rent.customerId = Number(cart.customerId);
              rent.carId = Number(cart.carId);
              rent.rentDate = cart.rentDate;
              rent.returnDate = cart.returnDate;
              console.log(rent);
              this.rentalService.add(rent).subscribe((response) => {
                this.toastrService.success('başarılı');
              });
            });
          },
          (responseError) => {
            this.toastrService.error('Ödeme alınamadı', 'Hata');
          }
        );
      }
    } else {
      this.toastrService.error('Kart bilgileriniz eksiktir.');
    }
  }

  createPaymentFrom() {
    this.cardForm = this.formBuilder.group({
      nameonthecard: ['', Validators.required],
      cardnumber: ['', Validators.required],
      cardcvv: ['', Validators.required],
      expirationmonth: ['', Validators.required],
      expirationyear: ['', Validators.required],
    });
  }
}
