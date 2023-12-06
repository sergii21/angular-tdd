import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProductCardConfig } from '../../models/product-card-config.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() productCardConfig: ProductCardConfig | undefined;

  @Input() card: Product | undefined;

  public get title(): string | null | undefined {
    return this.productCardConfig?.hasTitle ? this.card?.title : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({changes});
    
  }
}
