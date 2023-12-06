import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as fromProduct from './product.reducer';

export const selectState = (state: AppState) => state.products;
 
export const selectAllProducts =
    createSelector(selectState, fromProduct.selectAll);