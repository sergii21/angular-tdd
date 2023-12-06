import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardProductCardListComponent } from '../../products/components/dashboard-product-card-list/dashboard-product-card-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DashboardProductCardListComponent
  ]
})
export class DashboardComponent {

}
