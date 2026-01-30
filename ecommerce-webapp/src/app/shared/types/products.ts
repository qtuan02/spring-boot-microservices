import { ResponseError, ResponsePageList } from './response';

export type Product = {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export type ProductListResponse = ResponsePageList<Product>;

export type ProductResponseError = ResponseError & {
  error_category: string;
};
