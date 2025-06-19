import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCategory} from '../models/productcategory.model';
import {ProductCategoryService} from '../services/productcategoryservice/productcategory.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-category',
  imports: [
    NgForOf,
    CommonModule
  ],
  standalone: true,
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent {
  categories: ProductCategory[] = [];
  loading: boolean = false; // <-- new flag

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.loadProductCategories();
  }

  loadProductCategories() {
    this.loading = true; // Start loading
    this.productCategoryService.getProductCategories().subscribe({
      next: (data: ProductCategory[]) => {
        this.categories = data;
        this.loading = false; // Stop loading
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.loading = false; // Stop loading on error too
      }
    });
  }

  deleteCategory(id: number) {
    this.productCategoryService.deleteProductCategory(id).subscribe({
      next: () => {
        console.log('Category deleted');
        this.loadProductCategories();
      },
      error: (error) => {
        console.error('Error deleting category', error);
      }
    });
  }
}
