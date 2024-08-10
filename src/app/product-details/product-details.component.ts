import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import productsData from '../../../public/products.json';
import { FloorPipe } from '../floor.pipe';
import { CalculateDiscountPipe } from '../calculate-discount.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FloorPipe, CalculateDiscountPipe, StarRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  productsList: Product[] = productsData;

  productDetails: any;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log('🚀 ~ ProductDetailsComponent ~ ngOnInit ~ id:', id);
    this.productDetails = this.productsList.find(
      (product) => product.id === +id
    );
  }

  changeImg(images: string[], index: number) {
    this.productDetails.images = images;
    const currentImg = document.getElementById('current-img');
    if (currentImg) {
      currentImg.setAttribute('src', images[index]);
    }
  }
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}
