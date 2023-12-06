import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { ProductsHttpService } from '../services/products-http.service';
import { ProductActions } from './product.actions';


@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ProductActions.loadProducts),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.productsHttpService.getProducts().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          // catchError(error => of(ProductActions.loadProductsFailure({ error })))
          )
      )
    );
  });


  constructor(
    private actions$: Actions,
    private productsHttpService:ProductsHttpService
    ) {}
}
