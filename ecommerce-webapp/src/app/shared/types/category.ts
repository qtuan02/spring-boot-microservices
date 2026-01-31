import { ResponsePageList } from './response';

export interface Category {
  code: string;
  name: string;
}

export type CategoryListResponse = ResponsePageList<Category>;
