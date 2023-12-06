import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as fromProduct from './product.reducer';

export const selectState = (state: AppState) => state?.[fromProduct.productsFeatureKey];
 
export const selectAllProducts =
    createSelector(selectState, fromProduct?.selectAll); 
