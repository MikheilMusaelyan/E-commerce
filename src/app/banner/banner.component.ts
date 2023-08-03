import { Component, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @ViewChildren('banner') banner: any;

  ngAfterViewInit(): void {
    
    window.addEventListener('scroll', () => {
      let scrollSpeed = 0.5
      let scrollPos = window.scrollY * scrollSpeed;
      this.banner._results[0].nativeElement.style.transform = `translateY(${scrollPos}px)`;

      scrollSpeed = 0.4
      scrollPos = window.scrollY * scrollSpeed;
      this.banner._results[1].nativeElement.style.transform = `translateY(${scrollPos}px)`;

      scrollSpeed =0.2
      scrollPos = window.scrollY * scrollSpeed;
      this.banner._results[2].nativeElement.style.transform = `translateY(${scrollPos}px)`;
    });
  }
}
