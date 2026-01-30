import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [MatPaginatorModule],
  templateUrl: './pagination.html',
})
export class Pagination {
  pageSize = input<number>(10);
  length = input.required<number>();
  hidePageSize = input<boolean>(true);
  pageIndex = input.required<number>();

  pageChange = output<PageEvent>();

  handlePageEvent(e: PageEvent) {
    this.pageChange.emit(e);
  }
}
