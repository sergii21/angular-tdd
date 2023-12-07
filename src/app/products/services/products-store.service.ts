import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { ProductActions } from '../store/product.actions';
import * as selectors from '../store/product.selectors';
@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {
  products$ = this.store.select(selectors.selectAllProducts);
  
  constructor(
    private store: Store<AppState>
  ) { }


  getProducts() {
    return this.store.dispatch(ProductActions.loadProducts())
  }
}
