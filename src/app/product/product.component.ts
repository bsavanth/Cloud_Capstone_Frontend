import { Component } from '@angular/core';
import { ProductService} from '../services/productservice/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products', error);
        this.loading = false;
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted');
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }
}
