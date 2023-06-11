import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild('scrollItem', {static: false}) scrollItem: any;
  currentIndex = 0

  images: any[] = [
    {image: 'https://img.favpng.com/23/20/2/printed-t-shirt-hoodie-screen-printing-png-favpng-NP8HWbgirazf12XmMeJUnHiis.jpg'},
    {image: 'https://img.favpng.com/23/20/2/printed-t-shirt-hoodie-screen-printing-png-favpng-NP8HWbgirazf12XmMeJUnHiis.jpg'},
    {image: 'https://img.favpng.com/23/20/2/printed-t-shirt-hoodie-screen-printing-png-favpng-NP8HWbgirazf12XmMeJUnHiis.jpg'},
    {image: 'https://img.favpng.com/23/20/2/printed-t-shirt-hoodie-screen-printing-png-favpng-NP8HWbgirazf12XmMeJUnHiis.jpg'},
    {image: 'https://img.favpng.com/23/20/2/printed-t-shirt-hoodie-screen-printing-png-favpng-NP8HWbgirazf12XmMeJUnHiis.jpg'},
    {image: 'https://img.favpng.com/23/20/2/printed-t-shirt-hoodie-screen-printing-png-favpng-NP8HWbgirazf12XmMeJUnHiis.jpg'},
  ]

  scrollRight() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  
  scrollLeft() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    if(this.currentIndex == 0){
      this.scrollItem.nativeElement.style.transition = ''
    }
  }
  
}
