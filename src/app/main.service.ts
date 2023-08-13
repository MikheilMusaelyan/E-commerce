import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})

export class MainService {
  constructor(private http: HttpClient) {} 

  items: Item[] = [
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://www.pngall.com/wp-content/uploads/2/Rolex-Watch-PNG-Free-Image.png',
      id: 1,
      quantity: 1,
      price: 2.54
    },
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://shopveloce.co/cdn/shop/products/Natural-Black-Volcanic-Lava-Stone-Dumbbell-Bracelet-black-Matte-Beads-Bracelets-For-Women-Men-Fitness-Barbell.jpg_640x640_13bab9ec-6ef1-4e4c-ad16-ee64b5bb5ba9.jpg?v=1686700256',
      id: 2,
      quantity: 1,
      price: 24.51
    },
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Arcadia_watch_c_1950.png',
      id: 3,
      quantity: 1,
      price: 102.32
    },
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://cdn.discordapp.com/attachments/1008571121743962212/1117567493666513047/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_596b25fc-4e23-478e-99f5-022c115753e6.png',
      id: 4,
      quantity: 1,
      price: 2
    },
  ]
  cartItems: Item[] = [];
  total: number = 0;
  changedPrice: Subject<number> = new Subject()

  addItem(item: Item){
    let found: boolean = false;
    this.cartItems.forEach((i: Item) => {
      if(item.id == i.id){
        found = true
        i.quantity += item.quantity;
        this.total += (item.quantity * item.price);
        this.changedPrice.next(this.total)
        return
      }
    })
    if(!found){
      this.total += (item.quantity * item.price)
      this.changedPrice.next(this.total)
      this.cartItems.push(item)
    }
  }


  // not used yet
  removeItem(itemId: number){
    for (let item = 0; item < this.cartItems.length; item++) {
      if(itemId == this.cartItems[item].id){
        this.total -= (this.cartItems[item].price * this.cartItems[item].quantity);
        this.changedPrice.next(this.total)
        this.cartItems.splice(item, 1);
        return
      }
    }
  }
  
  // not used yet
  increaseAmount(itemId: number, bool: boolean) {
    for (const item of this.cartItems) {
      if (itemId === item.id) {
        if (bool) {
          item.quantity++;
        } else {
          item.quantity = Math.max(item.quantity - 1, 1);
        }
        break;
      }
    }
  }

  // backend

  createCustomer(data: any){
    return this.http.post('http://localhost:3000/create-customer', data);
  }

  StartSubscription(data: any) {
    return this.http.post('http://localhost:3000/create-subscription', data);
  }

  sendMail(data: any) {
    return this.http.post('http://localhost:3000/send-email', data);
  }
}

export class Item {
  name: string;
  image: string;
  id: number;
  quantity: number;
  price: number
}