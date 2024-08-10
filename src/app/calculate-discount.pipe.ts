import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateDiscount',
  standalone: true
})
export class CalculateDiscountPipe implements PipeTransform {

  transform(value: number[], ...args: unknown[]): number {
    const price = value[0];
    const discount = value[1];
    if (price && discount) {
      return price - (price * (discount / 100));
    }
    return price;
  }

}
