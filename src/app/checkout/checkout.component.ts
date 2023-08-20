import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, StripeCardNumberComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { Item, MainService } from '../main.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { faArrowRight, faArrowRightLong, faCheck, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('1', [
      state('void', style({
        'opacity': '0'
      })),
      transition('* => *', animate('0.4s ease-in-out'))
    ]),
    trigger('2', [
      state('void', style({
        'opacity': '0'
      })),
      transition('* => *', animate('0.4s ease-in-out'))
    ]),
    trigger('3', [
      state('void', style({
        'opacity': '0'
      })),
      transition('* => *', animate('0.3s ease-in-out'))
    ])
  ]
})
export class CheckoutComponent {
  arrowRight = faArrowRightLong;
  shippingForm: FormGroup = new FormGroup({
    zipCode: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    country: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    city: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    state: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    apt: new FormControl(null, [Validators.maxLength(50)]),
  })
  customerID: any;
  step: string = 'shipping';

  // payment
  paymentState: string = 'neutral'
  paymentIcon = faCheck;
  paymentForm: string;
  paymentLoading: boolean = false;

  // forms
  form1: string;
  form2: string;

  // stripe element
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '15px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };
  // stripe form
  stripeTest: FormGroup;

  // cartItems
  cartItems: Item[] = this.service.cartItems;
  total: number = this.service.total

  constructor(
    private stripeService: StripeService,
    private service: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.stripeTest = this.fb.group({
      cardNumber: ['', [Validators.required]],
      cardExpiry: ['', [Validators.required]],
      cardCvc: ['', [Validators.required]],
    });
    
    this.service.changedPrice.subscribe((data: number) => {
      this.total = data
    })
  }

  stepOne(){
    if(this.shippingForm.invalid || this.cartItems?.length == 0){
      return
    }

    // create customer
    this.service.createCustomer({ email: this.shippingForm.controls['email'].value})
    .subscribe((res: any) => {
      this.customerID = res.customer.id;
    }, err => {
      this.customerID = 'randomCustomerId@bigboyzz.com'
    })

    // open up the card card
    this.step = 'billin'
    setTimeout(() => {
      this.step = 'billing'
    }, 300);
  }

  pay(): void {
    if(this.cartItems?.length == 0 || this.paymentLoading){
      return
    }
    this.paymentLoading = true;
    this.stripeService.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: {name: null},
    })
    .subscribe((result) => {
      if (result.paymentMethod) {
        this.service.StartSubscription({
          paymentMethodId: result.paymentMethod,
          customerID: this.customerID || 'randomCustomerId@bigboyzz.com',
          shippingForm: this.shippingForm.value
        }).subscribe((res) => {
          this.changePaymentState('success', 2000);
        }, err => {
          this.changePaymentState('error', 2000)
        });
        return
      }
      this.changePaymentState('error', 2000)
    }, err => {
      this.changePaymentState('error', 2000)
    });
  }

  changePaymentState(string: string, timeout: number){
    this.paymentLoading = false
    if(string == 'error'){
      this.paymentIcon = faXmark;
    } else{
      this.paymentIcon = faCheck;
      this.service.resetCart();
      setTimeout(() => {
        this.router.navigate([''])
      }, timeout);
    }
    this.paymentState = string;
    if(timeout > 0){
      setTimeout(() => {
        this.paymentState = 'neutral';
      }, timeout);
    }
  }

}
