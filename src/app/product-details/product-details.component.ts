import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FloorPipe } from '../floor.pipe';
import { CalculateDiscountPipe } from '../calculate-discount.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ProductsRequestService } from '../services/products-request.service';
import { Product } from '../interface/product.interface';
import { cartItem } from '../interface/cartItem.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FloorPipe, CalculateDiscountPipe, StarRatingComponent, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productDetails: any;
  counter: number = 1;
  cartItems!: cartItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productRequestService: ProductsRequestService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.productRequestService.getProductsDetails(id).subscribe(
      (product) => (this.productDetails = product),
      (err) => {
        if (err.status === 404) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  changeImg(images: string[], index: number) {
    this.productDetails.images = images;
    const currentImg = document.getElementById('current-img');
    if (currentImg) {
      currentImg.setAttribute('src', images[index]);
    }
  }

  counterDecrement() {
    if (this.counter > 1) {
      this.counter--;
    }
  }

  counterIncrement() {
    if (this.counter < this.productDetails.stock) {
      this.counter++;
    }
  }

  addToCart(item: Product, quantity: number) {
    console.log(item);
    this.cartService.addToCart({ product: item, quantity });
    console.log('cart service total items: ', this.cartService.getTotalItems());
  }

  buyNow(item: Product, quantity: number) {
    console.log(item);
    this.cartService.addToCart({ product: item, quantity });
    console.log(this.cartService.getTotalItems());
    this.router.navigate(['/cart']);
  }
}
