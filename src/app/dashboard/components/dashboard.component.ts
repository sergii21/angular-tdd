import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ProductCardListComponent } from '../../products/components/product-card-list/product-card-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ProductCardListComponent
  ]
})
export class DashboardComponent {


}
