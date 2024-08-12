import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsRequestService } from '../services/products-request.service';
import { Product } from '../interface/product.interface';

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
