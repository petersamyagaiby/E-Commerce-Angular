import { Component } from '@angular/core';
import { cartItem } from '../interface/cartItem.interface';
import { CartService } from '../services/cart.service';
import { CalculateDiscountPipe } from '../calculate-discount.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CalculateDiscountPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems!: cartItem[];
  totalPrice!: number;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  counterIncrement(item: cartItem) {
    if (item.quantity < item.product.stock) {
      item.quantity += 1;
    }
    this.totalPrice = this.cartService.getTotalPrice();
  }

  counterDecrement(item: cartItem) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeFromCart(item: cartItem) {
    this.cartService.removeFromCart(item.product.id);
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
