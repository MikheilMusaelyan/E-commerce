import { Component, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @ViewChildren('banner') banner: any;

  ngAfterViewInit(): void {
    let scrollSpeed = 0.5
    window.addEventListener('scroll', () => {
      // Calculate the new scroll position with slower scroll speed
      const scrollPos = window.scrollY * scrollSpeed;
  
      // Apply the new scroll position as a translateY transform to the banner image
      for(let i = 0; i < this.banner._results.length; i++){
        this.banner._results[i].nativeElement.style.transform = `translateY(${scrollPos+i}px)`;
      }
    });
  }
}
