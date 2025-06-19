import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCategory} from '../../models/productcategory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

private apiUrl = '/api/product-category'; // 

  constructor(private http: HttpClient) { }

  // Get all Product Categories (Typed Response)
  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/getProductCategories`);
  }

  // Delete a Product Category
  deleteProductCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });

  }
}
