import { Injectable } from '@angular/core';
import { cartItem } from '../interface/cartItem.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: cartItem[] = [];
  private cartSubject: BehaviorSubject<cartItem[]> = new BehaviorSubject<
    cartItem[]
  >([]);
  public cart: Observable<cartItem[]> = this.cartSubject.asObservable();

  constructor() {}

  public addToCart(product: cartItem) {
    const existedProduct = this.cartItems?.find(
      (item) => item.product.id === product.product.id
    );
    if (existedProduct) {
      existedProduct.quantity += product.quantity;
    } else {
      this.cartItems?.push(product);
    }
    this.cartSubject.next(this.cartItems);
  }

  public removeFromCart(productId: number) {
    this.cartItems = this.cartItems?.filter(
      (item) => item.product.id !== productId
    );
    this.cartSubject.next(this.cartItems);
  }

  getTotalItems(): number {
    return this.cartItems?.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems?.reduce(
      (total, item) =>
        total +
        (item.product.price -
          item.product.price * (item.product.discountPercentage / 100)) *
          item.quantity,
      0
    );
  }
}
