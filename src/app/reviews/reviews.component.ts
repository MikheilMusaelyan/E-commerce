import { Component } from '@angular/core';
import { faCheck, faDiagramSuccessor, faFlag, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  star = faStar;
  tick = faCheck;
  flag = faFlag
}