import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, StripeCardNumberComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { MainService } from '../main.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
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

  constructor(
    private stripeService: StripeService,
    private service: MainService,
  ) {
  }

  onClickSubmit(data: any) {
    
  }

  stepOne(){
    if(this.shippingForm.invalid){
      return
    }
    console.log(this.shippingForm.controls['email'].value)
    this.service.createCustomer({ email: this.shippingForm.controls['email'].value})
    .subscribe((res: any) => {
      this.customerID = res.customer.id;
    })
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.stripeService.createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: {name: null},
      })
      .subscribe((result) => {
        if (result.paymentMethod) {
          this.service.StartSubscription({
            paymentMethodId: result.paymentMethod,
            customerID: this.customerID,
          }).subscribe((res) => {
            console.log(res);
          });
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
    }
  }

}
