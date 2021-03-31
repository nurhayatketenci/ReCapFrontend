import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']})
export class CreditCardComponent implements OnInit {
 creditcards:CreditCard[]
 creditcard:CreditCard
 cardForm:FormGroup
 currentCar:CarDetailDto
 currentcreditCard:CreditCard
 NameOnTheCard:string
 CardNumber:string
 CardCvv:string
 ExpirationMonth:number
 ExpirationYear:number
 TotalMoney:Number
  constructor(private creditCardService:CreditcardService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private router:Router,
              private rentalService:RentalService) { }

  ngOnInit(): void {
    console.log(this.rentalService.getRentingCar())
    this.createCreditCartFrom()

  }
  getCard(){
    console.log(this.cardForm.value)
    if (this.cardForm.valid) {
    let creditCard = Object.assign({}, this.cardForm.value);
    // creditCard.NameOnTheCard = this.currentcreditCard.nameOnTheCard
    // creditCard.CardNumber = this.currentcreditCard.cardNumber
    // creditCard.CardCvv = this.currentcreditCard.cardCvv
    // creditCard.ExpirationMonth = this.currentcreditCard.expirationMonth
    // creditCard.ExpirationYear = this.currentcreditCard.expirationYear
    // creditCard.TotalMoney = this.currentcreditCard.totalMoney
    this.creditCardService.getCardbyid(this.cardForm.value.cardnumberx).subscribe(response=>{
    this.creditcard=response.data
    this.toastrService.success("ödeme tamamlandı")
    
    })
    
   }
  }
  createCreditCartFrom() {
    this.cardForm = this.formBuilder.group({
      "nameonthecardx": ["", Validators.required],
      "cardnumberx": ["", Validators.required],
      "cardcvvx": ["", Validators.required],
      "expirationmonthx": ["", Validators.required],
      "expirationyearx": ["", Validators.required],
      "totalmoneyx": [""]
    })
  }
}
