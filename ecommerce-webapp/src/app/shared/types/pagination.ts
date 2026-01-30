import { PageEvent } from '@angular/material/paginator';

export type PageParams = {
  page?: number;
  size?: number;
};

export type PagePagination = {
  length: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (e: PageEvent) => void;
};
