import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { injectCategoryList } from '../../services/category';

@Component({
  selector: 'app-sidebar',
  imports: [MatButton],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  Array = Array;

  selectedCategory = input<string | null>(null);
  categoryChange = output<string | null>();

  categories = injectCategoryList();

  onCategoryClick(categoryCode: string | null) {
    this.categoryChange.emit(categoryCode);
  }
}
