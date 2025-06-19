import {ProductCategory} from './productcategory.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categories: ProductCategory[];
}
