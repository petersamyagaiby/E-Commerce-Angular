import { Component } from '@angular/core';
// import productsData from '../../../public/products.json';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsRequestService } from '../services/products-request.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  productsList!: Product[];
  constructor(private productsRequestService: ProductsRequestService) {}

  ngOnInit() {
    this.productsRequestService.getProductsList().subscribe((data: any) => {
      this.productsList = data.products;
    });
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
