import { Component } from '@angular/core';
import { faArrowDown, faArrowRight, faTruckFront, faStar as star} from '@fortawesome/free-solid-svg-icons';
import { faStar as lastStar, faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import { Item, MainService, Variation, cartItem } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css']
})

export class SingleitemComponent {
  constructor(
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      for(let i of this.items){
        if(params['id'] == i['id']){
          this.selectedItem = i
        }
      }
    })
  }

  starIcon = star;
  lastStar = lastStar;
  arrowRight = faArrowRight;
  truck = faTruckFront;
  
  // styles
  one: boolean = false;
  two: boolean = false;
  hovered: string = '';

  // func
  items: Item[] = this.service.items
  selectedItem: Item;
  vipOffer: boolean = true;

  ngAfterViewInit(){
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  changeOffer(bool: boolean){
    this.vipOffer = bool;
  }

  selectVariation(i: Variation){
    this.selectedItem['selectedVariation'] = i
  }

  increase(bool:boolean){
    if(bool){
      this.selectedItem.quantity++
      return
    }
    this.selectedItem.quantity = Math.max(this.selectedItem.quantity - 1, 1)
  }

  addToCart(){
    let item: cartItem = {
      name: this.selectedItem['name'],
      quantity: this.selectedItem['quantity'],
      price: this.selectedItem['vipOfferPrice'],
      image: this.selectedItem['selectedVariation']['variationImage'],
      variationName: this.selectedItem['selectedVariation']['variationName'],
      variationValue: this.selectedItem['selectedVariation']['variationValue'],
      id: this.selectedItem['selectedVariation']['id'],
      size: this.selectedItem['selectedSize'],
      vipOffer: true
    }
    if(this.vipOffer){
      this.service.addItem(item)
    } else {
      this.service.addItem({
        ...item,
        vipOffer: false,
        price: this.selectedItem['price']
      })
    }
    this.selectedItem.quantity = 1;
    this.router.navigate(['/checkout'])
  }

  // styles
  hoverOver(i: any){
    this.hovered = i['variationImage']
  }

  hoverOut(){
    this.hovered = '' 
  }

  zoomIn(event:any){
    const img = event.target;
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const offsetX = (x / rect.width) * 100;
    const offsetY = (y / rect.height) * 100;
    img.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    img.classList.add('zoomed');
  }

  zoomOut(event:any){
    const img = event.target;
    img.classList.remove('zoomed')
  }

  toggle(st:string){
    if(st == 'one'){
      this.one = !this.one
      return
    }
    this.two = !this.two
  }
}
