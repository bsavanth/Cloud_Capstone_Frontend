import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToCategories() {
    this.router.navigate(['/productcategories']);
  }
}
