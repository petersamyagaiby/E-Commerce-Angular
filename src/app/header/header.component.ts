import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}

  counter: number = 0;
  totalItems: number = 0;
  ngOnInit() {
    this.cartService.cart.subscribe((items) => {
      this.counter = items.length;
    });
    this.totalItems = this.cartService.getTotalItems();
  }
}
