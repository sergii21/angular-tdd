import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { dashboardProductCardConfig } from '../../consts/product-card-config.const';
import { Product } from '../../models/product.model';
import { ProductsStoreService } from '../../services/products-store.service';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';

@Component({
  selector: 'app-dashboard-product-card-list',
  standalone: true,
  imports: [CommonModule, ProductCardListComponent,
  ],
  templateUrl: './dashboard-product-card-list.component.html',
  styleUrl: './dashboard-product-card-list.component.scss'
})
export class DashboardProductCardListComponent implements OnInit{
  products$!: Observable<Product[]>;
  constructor(
    private productsStoreService:ProductsStoreService
  ) {} 
  
  ngOnInit(): void {
    this.productsStoreService.getProducts();
    this.products$ = this.productsStoreService.products$;
  }
  dashboardProductCardConfig = dashboardProductCardConfig;

}
