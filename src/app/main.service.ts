import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      quantity: 1
    },
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://shopveloce.co/cdn/shop/products/Natural-Black-Volcanic-Lava-Stone-Dumbbell-Bracelet-black-Matte-Beads-Bracelets-For-Women-Men-Fitness-Barbell.jpg_640x640_13bab9ec-6ef1-4e4c-ad16-ee64b5bb5ba9.jpg?v=1686700256',
      id: 2,
      quantity: 1
    },
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Arcadia_watch_c_1950.png',
      id: 3,
      quantity: 1
    },
    {
      name: 'IronWrist Bracelet (Pack of 5)',
      image: 'https://cdn.discordapp.com/attachments/1008571121743962212/1117567493666513047/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_596b25fc-4e23-478e-99f5-022c115753e6.png',
      id: 4,
      quantity: 1
    },
  ]

  cartItems: Item[] = []


  addItem(item: Item){
    let found: boolean = false;
    this.cartItems.forEach((i: Item) => {
      if(item.id == i.id){
        found = true
        i.quantity += item.quantity
        return
      }
    })
    if(!found){
      this.cartItems.push(item)
    }
  }

  removeItem(itemId: number){
    this.cartItems = this.cartItems.filter(item => item.id != itemId)
  }

  increaseAmount(itemId: number) {
    this.cartItems = this.cartItems.map(item => {
      if (item.id == itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
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
}