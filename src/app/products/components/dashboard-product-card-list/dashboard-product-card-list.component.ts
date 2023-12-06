import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { dashboardProductCardConfig } from '../../consts/product-card-config.const';
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
  products$ = this.productsStoreService.products$;
  constructor(
    private productsStoreService:ProductsStoreService
  ) {} 
  
  ngOnInit(): void {
    this.productsStoreService.getProducts();
  }
  dashboardProductCardConfig = dashboardProductCardConfig;

}
