import { PageEvent } from '@angular/material/paginator';

export type PageParams = {
  page?: number;
};

export type PagePagination = {
  length: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (e: PageEvent) => void;
};
