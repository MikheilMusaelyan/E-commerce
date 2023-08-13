import { Component } from '@angular/core';
import { faArrowDown, faArrowRight, faTruckFront, faStar as star} from '@fortawesome/free-solid-svg-icons';
import { faStar as lastStar, faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import { Item, MainService } from '../main.service';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css']
})

export class SingleitemComponent {
  constructor(private service: MainService){}

  starIcon = star;
  lastStar = lastStar;
  arrowRight = faArrowRight;
  truck = faTruckFront;
  
  // styles
  one: boolean = false;
  two: boolean = false
  hovered: string = ''

  // func
  items: Item[] = this.service.items
  selectedItem: Item = this.items[0];
  
  selectImage(i: Item){
    this.selectedItem = i
  }

  increase(bool:boolean){
    if(bool){
      this.selectedItem.quantity++
      return
    }
    this.selectedItem.quantity = Math.max(this.selectedItem.quantity - 1, 1)
  }

  addToCart(){
    this.service.addItem({...this.selectedItem})
    this.selectedItem.quantity = 1
  }

  // styles
  hoverOver(i: any){
    this.hovered = i.image
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
