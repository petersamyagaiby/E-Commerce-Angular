import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CalculateDiscountPipe } from '../calculate-discount.pipe';
import { FloorPipe } from '../floor.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CalculateDiscountPipe, FloorPipe, StarRatingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: any;

  get newString() {
    return this.product.description.slice(0, 50) + '...';
  }

  constructor(private router: Router) {}

  handleRedirect(id: number) {
    this.router.navigate(['/products', id]);
  }
}
