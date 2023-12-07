import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CounterComponent } from './counter/counter.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductsStoreService } from './products/services/products-store.service';
import { selectAllProducts } from './products/store/product.selectors';
import { MainNavigationComponent } from './shared/components/main-navigation/main-navigation.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    HeaderComponent,
    MainNavigationComponent,
    HomeComponent,
    CounterComponent,
    DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  store = inject(Store); 
  count?:any;
  constructor(
    private productsStoreService: ProductsStoreService

  ) {
    this.productsStoreService.getProducts();

    this.count = this.store.pipe(select(selectAllProducts))
  }
  onCountChange(event: number) {
    console.log(event);
  }
  title = 'angular-tdd';
}
