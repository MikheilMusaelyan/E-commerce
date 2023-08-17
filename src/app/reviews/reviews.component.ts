import { Component, Input } from '@angular/core';
import { faCheck, faDiagramSuccessor, faFlag, faStar } from '@fortawesome/free-solid-svg-icons';
import { Review } from '../main.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input('reviews') reviews: any[];
  @Input('reviewCount') reviewCount: number;
  @Input('rating') rating: number;
  showReviews: any[] = [];

  ngOnInit(){
    console.log(this.reviews)
    setTimeout(() => {
      for(let i = 0; i < this.reviews.length; i++){
        if((i % 2) == 0){
          this.showReviews.push([
            this.reviews[i]
          ])
        } else {
          this.showReviews[Math.floor(i / 2)].push(this.reviews[i])
        }
      }
    }, 100);
  }

  star = faStar;
  tick = faCheck;
  flag = faFlag;
}
