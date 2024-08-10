import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating!: number;

  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }

  get emptyStars() {
    return Array(5 - Math.ceil(this.rating)).fill(0);
  }
}
