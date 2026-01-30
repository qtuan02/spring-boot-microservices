import { Component, input, output } from '@angular/core';
import { Product } from '~/shared/types/products';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();

  handleAddToCart = output<Product>();
}
