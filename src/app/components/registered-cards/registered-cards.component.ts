import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-registered-cards',
  templateUrl: './registered-cards.component.html',
  styleUrls: ['./registered-cards.component.css'],
})
export class RegisteredCardsComponent implements OnInit {
  cards: CreditCard[] = [];
  @Output() valueChange = new EventEmitter();

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.getCards();
  }
  getCards() {
    this.paymentService.getCards().subscribe((response) => {
      this.cards = response.data;
    });
  }
  getCard(id: number) {
    this.paymentService.getCardById(id).subscribe((response) => {
      this.valueChange.emit(response.data);
    });
  }
}
