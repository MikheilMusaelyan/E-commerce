import { Component } from '@angular/core';
import { faArrowRight, faStar as star} from '@fortawesome/free-solid-svg-icons';
import { faStar as lastStar} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css']
})
export class SingleitemComponent {
  starIcon = star;
  lastStar = lastStar;
  arrowRight = faArrowRight;
  quantity: number = 1;
  // cart = facart
  images = [
    'https://shopveloce.co/cdn/shop/products/Natural-Black-Volcanic-Lava-Stone-Dumbbell-Bracelet-black-Matte-Beads-Bracelets-For-Women-Men-Fitness-Barbell.jpg_640x640_13bab9ec-6ef1-4e4c-ad16-ee64b5bb5ba9.jpg?v=1686700256',
    'https://www.pngall.com/wp-content/uploads/2/Rolex-Watch-PNG-Free-Image.png',
    'https://upload.wikimedia.org/wikipedia/commons/c/cc/Arcadia_watch_c_1950.png',
    'https://cdn.discordapp.com/attachments/1008571121743962212/1117567493666513047/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_596b25fc-4e23-478e-99f5-022c115753e6.png',
    // 'https://cdn.discordapp.com/attachments/1008571121743962212/1117564117084029082/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_4eb55e22-1173-4d20-aa98-bc05b3c1b17c.png',
  ]
  selectedImage: string = this.images[0];
  hovered: string = ''

  selectImage(i:string){
    this.selectedImage = i
  }
  hoverOver(i:string){
    this.hovered = i
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
}
