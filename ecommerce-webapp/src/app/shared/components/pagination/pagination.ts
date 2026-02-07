import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [MatPaginatorModule],
  templateUrl: './pagination.html',
  host: { class: '' },
})
export class Pagination {
  length = input.required<number>();
  pageSize = input.required<number>();
  pageIndex = input.required<number>();

  hidePageSize = input<boolean>(false);
  pageSizeOptions = input<number[]>([8, 12, 16, 20]);

  pageChange = output<PageEvent>();

  handlePageEvent(e: PageEvent) {
    this.pageChange.emit(e);
  }
}
