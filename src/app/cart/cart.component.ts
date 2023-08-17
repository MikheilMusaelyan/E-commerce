import { Component } from '@angular/core';
import { Item, MainService, cartItem } from '../main.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(
    private service: MainService,
    private router: Router
  ){}
  
  cartItems: cartItem[] = this.service.cartItems;
  total: number = this.service.total;
  
  increase(item: cartItem, bool: boolean){
    this.service.increaseAmount(item, bool);
    if (bool) {
      this.total = parseFloat((this.total + parseFloat(item.price.toFixed(2))).toFixed(2));
    } else {
      this.total = parseFloat((this.total - parseFloat(item.price.toFixed(2))).toFixed(2));
    }
  }

  reroute(id: number){
    this.router.navigate(['/item', Math.floor(id)])
  }
}
