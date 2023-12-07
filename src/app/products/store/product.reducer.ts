import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductActions } from './product.actions';

export const productsFeatureKey = 'products';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  a:1
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id
});

export const initialState: ProductState = adapter.getInitialState({
  // additional entity state properties
  a:1
});

export const reducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.upsertProduct,
    (state, action) => adapter.upsertOne(action.product, state)
  ),
  on(ProductActions.addProducts,
    (state, action) => adapter.addMany(action.products, state)
  ),
  on(ProductActions.upsertProducts,
    (state, action) => adapter.upsertMany(action.products, state)
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.updateProducts,
    (state, action) => adapter.updateMany(action.products, state)
  ),
  on(ProductActions.deleteProduct,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProducts,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => adapter.setAll(action.products, state)
  ),
  on(ProductActions.clearProducts,
    state => adapter.removeAll(state)
  ),
);

export const productsFeature = createFeature({
  name: productsFeatureKey,
  reducer,
  extraSelectors: ({ selectProductsState }) => ({
    ...adapter.getSelectors(selectProductsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = productsFeature;
