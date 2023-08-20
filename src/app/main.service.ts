import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})

export class MainService {
  constructor(private http: HttpClient) {}

  items: Item[] = [
    // {
    //   name: 'IronWrist Bracelet (Pack of 5)',
    //   image: 'https://www.pngall.com/wp-content/uploads/2/Rolex-Watch-PNG-Free-Image.png',
    //   id: 1,
    //   quantity: 1,
    //   price: 2.54
    // },
    // {
    //   name: 'IronWrist Bracelet (Pack of 5)',
    //   image: 'https://shopveloce.co/cdn/shop/products/Natural-Black-Volcanic-Lava-Stone-Dumbbell-Bracelet-black-Matte-Beads-Bracelets-For-Women-Men-Fitness-Barbell.jpg_640x640_13bab9ec-6ef1-4e4c-ad16-ee64b5bb5ba9.jpg?v=1686700256',
    //   id: 2,
    //   quantity: 1,
    //   price: 24.51
    // },
    // {
    //   name: 'IronWrist Bracelet (Pack of 5)',
    //   image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Arcadia_watch_c_1950.png',
    //   id: 3,
    //   quantity: 1,
    //   price: 102.32
    // },
    // {
    //   name: 'IronWrist Bracelet (Pack of 5)',
    //   image: 'https://cdn.discordapp.com/attachments/1008571121743962212/1117567493666513047/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_596b25fc-4e23-478e-99f5-022c115753e6.png',
    //   id: 4,
    //   quantity: 1,
    //   price: 2
    // },
    {
      id: 1,
      name: 'IronWrist Bracelet (Pack of 5)',
      quantity: 1,
      price: 7,
      oldPrice: 22,
      reviews: [
        [
          {
            name: 'Dato Kinkidze',
            review: 'This is the best review ever1',
            stars: 5,
            date: '02/07/2023' 
          },
          {
            name: 'Tato Kinkidze',
            review: 'This is the best review ever2',
            stars: 4,
            date: '06/11/2023' 
          },
          {
            name: 'Bato Kinkidze',
            review: 'This is the best review ever1',
            stars: 5,
            date: '02/02/2024' 
          },
        ],
        [
          {
            name: 'Sato Kinkidze',
            review: `This is the best review ever2 \n\n 
            This is the best review ever2 This is the best review ever2 This is the best review ever2`,
            stars: 4,
            date: '06/01/2024' 
          },
          {
            name: 'Sato Kinkidze',
            review: `This is the best review ever2 \n\n 
            This is the best review ever2 This is the best review ever2 This is the best review ever2`,
            stars: 4,
            date: '06/01/2024' 
          },
          {
            name: 'oato Kinkidze',
            review: 'This is the best review ever1',
            stars: 5,
            date: '02/02/2024' 
          },
        ],
        [
          {
            name: 'Dato Kinkidze',
            review: 'This is the best review ever1',
            stars: 5,
            date: '02/07/2023' 
          },
          {
            name: 'Tato Kinkidze',
            review: 'This is the best review ever2',
            stars: 4,
            date: '06/11/2023' 
          },
          {
            name: 'Bato Kinkidze',
            review: 'This is the best review ever1',
            stars: 5,
            date: '02/02/2024' 
          },
        ],
      ],
      reviewCount: 12,
      description: 
      `The best fucking description
      second line
      third line`,
      rating: 4.7,
      selectedSize: 'Medium',
      vipOffer: true,
      sizes: ['Small', 'Medium', 'Large'],
      vipOfferPrice: 1,
      variations: [
        {
          variationName: 'Color',
          variationValue: 'Green',
          variationImage: 'http://s1.picswalls.com/wallpapers/2017/12/11/nature-desktop-background_123026895_313.jpg',
          id: 1.1
        },
        {
          variationName: 'Color',
          variationValue: 'Red',
          variationImage: 'https://shopveloce.co/cdn/shop/products/black.jpg?v=1684163594',
          id: 1.2
        }
      ],
      selectedVariation: {
        variationName: 'Color',
        variationValue: 'Green',
        variationImage: 'http://s1.picswalls.com/wallpapers/2017/12/11/nature-desktop-background_123026895_313.jpg',
        id: 1.1
      },
    }
  ]
  
  cartItems: cartItem[] = [];
  total: number = 0;
  changedPrice: Subject<number> = new Subject()

  resetCart(){
    this.total = 0;
    this.cartItems = []
  }

  addItem(item: cartItem){
    let found: boolean = false;
    for(let i of this.cartItems){
      if(toli(i, item)){
        found = true;
        i['quantity'] += item['quantity'];
        this.total = parseFloat((this.total + (item['quantity'] * parseFloat(item['price'].toFixed(2)))).toFixed(2));
        this.changedPrice.next(this.total)
        return
      }
    }
    if(!found){
      this.total = parseFloat((this.total + (item['quantity'] * parseFloat(item['price'].toFixed(2)))).toFixed(2))
      this.changedPrice.next(this.total)
      this.cartItems.push(item)
    }
  }


  // not used yet
  removeItem(removeitem: cartItem){
    for (let item = 0; item < this.cartItems.length; item++) {
      if(toli(removeitem, this.cartItems[item])){
        this.total = parseFloat((this.total - (parseFloat(this.cartItems[item]['price'].toFixed(2)) * this.cartItems[item]['quantity'])).toFixed(2));
        this.changedPrice.next(this.total)
        this.cartItems.splice(item, 1);
        return
      }
    }
  }
  
  // not used yet
  increaseAmount(cartitem: cartItem, bool: boolean) {
    for (const item of this.cartItems) {
      if (toli(item, cartitem)) {
        if (bool) {
          item.quantity++;
          this.total = parseFloat((this.total + parseFloat(item.price.toFixed(2))).toFixed(2));
        } else {
          if(item.quantity == 1){
            this.removeItem(item)
            break;
          }
          item.quantity--;
          this.total = parseFloat((this.total - parseFloat(item.price.toFixed(2))).toFixed(2));
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
    const object = {
      ...data,
      // paymentMethodId: result.paymentMethod,
      // customerID: this.customerID,
      // shippingForm: this.shippingForm.value
      total: this.total,
      cartItems: this.cartItems
    }
    return this.http.post('http://localhost:3000/create-subscription', object);
  }

  sendMail(data: any) {
    return this.http.post('http://localhost:3000/send-email', data);
  }
}

export class Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  
  oldPrice?: number;
  reviews?: any[];
  reviewCount?: number;
  description?: string;
  rating?: number;
  variations?: Variation[];
  selectedVariation?: Variation;
  sizes?: any[];
  vipOfferPrice?: number;
  selectedSize?: string;
  vipOffer?: boolean;

  constructor(){
    this.vipOffer = true
  }
}

export class cartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
  variationName: string;
  variationValue: string;
  id: number;
  size: string;
  vipOffer: boolean
}
export class Variation {
  variationName: string
  variationValue: string;
  variationImage: string;
  id: number
}

export class Review {
  name: string;
  review: string;
  stars: number;
  date: string;
}

export function toli(item1: any, item2: any){
  if(
    item1['id'] == item2['id'] && // id
    item1['vipOffer'] == item2['vipOffer'] && // vopoffer    
    item1['size'] == item2['size']
  ){
    return true
  }
  return false
}