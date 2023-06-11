import { Component } from '@angular/core';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css']
})
export class SingleitemComponent {
  images = [
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Qtz_watch.png',
    'https://www.pngall.com/wp-content/uploads/2/Rolex-Watch-PNG-Free-Image.png',
    'https://upload.wikimedia.org/wikipedia/commons/c/cc/Arcadia_watch_c_1950.png'
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
}
