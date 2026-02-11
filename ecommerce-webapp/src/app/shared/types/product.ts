import { Author } from './author';
import { Category } from './category';
import { ResponsePageList } from './response';

export type Product = {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  category: Category;
  author: Author;
  tags: string[];
};

export type ProductListResponse = ResponsePageList<Product>;
