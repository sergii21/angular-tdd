import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as fromProduct from '../products/store/product.reducer';

export interface AppState {

  [fromProduct.productsFeatureKey]: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromProduct.productsFeatureKey]: fromProduct.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
