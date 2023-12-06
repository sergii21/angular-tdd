import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';


export const ProductActions = createActionGroup({
  source: 'Product/API',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Add Product': props<{ product: Product }>(),
    'Upsert Product': props<{ product: Product }>(),
    'Add Products': props<{ products: Product[] }>(),
    'Upsert Products': props<{ products: Product[] }>(),
    'Update Product': props<{ product: Update<Product> }>(),
    'Update Products': props<{ products: Update<Product>[] }>(),
    'Delete Product': props<{ id: string }>(),
    'Delete Products': props<{ ids: string[] }>(),
    'Clear Products': emptyProps(),
  }
});
