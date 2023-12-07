import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

export const selectProductsState = createFeatureSelector<fromProduct.ProductState>(fromProduct.productsFeatureKey);

export const selectAllProducts = fromProduct.selectAll;
export const selectA =
    createSelector(selectProductsState, s=>s.ids);
